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
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "30px",
            }}>
                <div>
                    <h1 className="section-title" style={{ marginBottom: "10px" }}>
                        Admin Dashboard
                    </h1>
                    <p style={{ color: "var(--text-secondary)" }}>
                        Gestisci i prodotti del negozio
                    </p>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                    <Link
                        href="/negozio"
                        style={{
                            padding: "12px 24px",
                            background: "rgba(255, 255, 255, 0.1)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            borderRadius: "8px",
                            color: "var(--text-color)",
                            textDecoration: "none",
                            display: "inline-block",
                        }}
                    >
                        Vedi Negozio
                    </Link>
                    <button
                        onClick={handleLogout}
                        style={{
                            padding: "12px 24px",
                            background: "rgba(239, 68, 68, 0.2)",
                            border: "1px solid rgba(239, 68, 68, 0.3)",
                            borderRadius: "8px",
                            color: "#ef4444",
                            cursor: "pointer",
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>

            {!showForm && (
                <div style={{ marginBottom: "30px" }}>
                    <button
                        onClick={() => {
                            setEditingProduct(null);
                            setShowForm(true);
                        }}
                        className="btn"
                        style={{ fontSize: "1rem" }}
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
