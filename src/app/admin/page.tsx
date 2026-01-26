"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/products";
import ProductForm from "@/components/admin/ProductForm";
import ProductList from "@/components/admin/ProductList";
import Link from "next/link";

export default function AdminDashboard() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordLoading, setPasswordLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Verifica autenticazione
        const token = localStorage.getItem("adminToken");
        if (!token) {
            router.push("/admin/login");
            return;
        }

        loadProducts();
    }, [router]);

    const loadProducts = async () => {
        try {
            const response = await fetch("/api/products");
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error loading products:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveProduct = async (productData: Partial<Product>) => {
        const token = localStorage.getItem("adminToken");

        try {
            if (editingProduct) {
                // Aggiorna prodotto esistente
                const response = await fetch(`/api/products/${editingProduct.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(productData),
                });

                if (!response.ok) {
                    throw new Error("Errore durante l'aggiornamento");
                }
            } else {
                // Crea nuovo prodotto
                const response = await fetch("/api/products", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(productData),
                });

                if (!response.ok) {
                    throw new Error("Errore durante la creazione");
                }
            }

            // Ricarica prodotti
            await loadProducts();
            setShowForm(false);
            setEditingProduct(null);
        } catch (error) {
            console.error("Error saving product:", error);
            throw error;
        }
    };

    const handleDeleteProduct = async (id: number) => {
        const token = localStorage.getItem("adminToken");

        try {
            const response = await fetch(`/api/products/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Errore durante l'eliminazione");
            }

            // Ricarica prodotti
            await loadProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Errore durante l'eliminazione del prodotto");
        }
    };

    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError("");

        if (newPassword.length < 6) {
            setPasswordError("La password deve essere di almeno 6 caratteri");
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError("Le password non coincidono");
            return;
        }

        setPasswordLoading(true);
        const token = localStorage.getItem("adminToken");

        try {
            const response = await fetch("/api/admin/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ newPassword }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Errore durante il cambio password");
            }

            alert("Password aggiornata con successo!");
            setShowPasswordModal(false);
            setNewPassword("");
            setConfirmPassword("");
        } catch (error: any) {
            setPasswordError(error.message);
        } finally {
            setPasswordLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        router.push("/admin/login");
    };

    if (loading) {
        return (
            <main className="container" style={{ paddingTop: "120px", minHeight: "100vh" }}>
                <div style={{ textAlign: "center", color: "var(--text-secondary)" }}>
                    Caricamento...
                </div>
            </main>
        );
    }

    return (
        <main className="container" style={{ paddingTop: "120px", minHeight: "100vh" }}>
            <div className="admin-header-flex">
                <div>
                    <h1 className="section-title" style={{ marginBottom: "10px", textAlign: "inherit" }}>
                        Admin Dashboard
                    </h1>
                    <p style={{ color: "var(--text-secondary)" }}>
                        Gestisci i prodotti del negozio
                    </p>
                </div>
                <div className="admin-actions">
                    <Link
                        href="/negozio"
                        className="toggle-btn"
                        style={{ display: "inline-block", textDecoration: "none" }}
                    >
                        Vedi Negozio
                    </Link>
                    <button
                        onClick={() => setShowPasswordModal(true)}
                        className="toggle-btn"
                    >
                        Cambia Password
                    </button>
                    <button
                        onClick={handleLogout}
                        className="toggle-btn"
                        style={{ borderColor: "rgba(239, 68, 68, 0.4)", color: "#ef4444" }}
                    >
                        Logout
                    </button>
                </div>
            </div>

            {!showForm && (
                <div style={{ marginBottom: "40px", display: "flex", justifyContent: "center" }}>
                    <button
                        onClick={() => {
                            setEditingProduct(null);
                            setShowForm(true);
                        }}
                        className="btn"
                        style={{ fontSize: "1.1rem", padding: "15px 40px" }}
                    >
                        + Aggiungi Nuovo Prodotto
                    </button>
                </div>
            )}

            {showForm && (
                <ProductForm
                    product={editingProduct}
                    onSave={handleSaveProduct}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingProduct(null);
                    }}
                />
            )}

            <ProductList
                products={products}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
            />

            {showPasswordModal && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(0, 0, 0, 0.8)",
                    backdropFilter: "blur(5px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000,
                    padding: "20px",
                }}>
                    <div style={{
                        background: "#1a1a1a",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "12px",
                        padding: "40px",
                        width: "100%",
                        maxWidth: "400px",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
                    }}>
                        <h2 style={{ marginBottom: "20px", color: "var(--accent-color)" }}>Cambia Password Admin</h2>
                        <form onSubmit={handlePasswordChange}>
                            <div style={{ marginBottom: "20px" }}>
                                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem" }}>Nuova Password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Almeno 6 caratteri"
                                    style={{
                                        width: "100%",
                                        padding: "12px",
                                        background: "rgba(0, 0, 0, 0.3)",
                                        border: "1px solid rgba(255, 255, 255, 0.1)",
                                        borderRadius: "6px",
                                        color: "white"
                                    }}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: "20px" }}>
                                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem" }}>Conferma Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Ripeti la password"
                                    style={{
                                        width: "100%",
                                        padding: "12px",
                                        background: "rgba(0, 0, 0, 0.3)",
                                        border: "1px solid rgba(255, 255, 255, 0.1)",
                                        borderRadius: "6px",
                                        color: "white"
                                    }}
                                    required
                                />
                            </div>

                            {passwordError && (
                                <div style={{ color: "#ff6b6b", marginBottom: "20px", fontSize: "0.85rem" }}>
                                    {passwordError}
                                </div>
                            )}

                            <div style={{ display: "flex", gap: "10px" }}>
                                <button
                                    type="submit"
                                    disabled={passwordLoading}
                                    className="btn"
                                    style={{ flex: 1, opacity: passwordLoading ? 0.7 : 1 }}
                                >
                                    {passwordLoading ? "Salvataggio..." : "Salva"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowPasswordModal(false);
                                        setPasswordError("");
                                    }}
                                    style={{
                                        flex: 1,
                                        padding: "14px",
                                        background: "transparent",
                                        border: "1px solid rgba(255, 255, 255, 0.2)",
                                        borderRadius: "8px",
                                        color: "white",
                                        cursor: "pointer"
                                    }}
                                >
                                    Annulla
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div style={{
                marginTop: "40px",
                padding: "20px",
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "8px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
            }}>
                <h3 style={{ marginBottom: "10px", color: "var(--accent-color)" }}>
                    Statistiche
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
                    <div>
                        <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                            Totale Prodotti
                        </div>
                        <div style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--accent-color)" }}>
                            {products.length}
                        </div>
                    </div>
                    <div>
                        <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                            Disponibili
                        </div>
                        <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#22c55e" }}>
                            {products.filter(p => p.inStock).length}
                        </div>
                    </div>
                    <div>
                        <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                            Valore Totale
                        </div>
                        <div style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--accent-color)" }}>
                            €{products.reduce((sum, p) => sum + p.price, 0).toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
