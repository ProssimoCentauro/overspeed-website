"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    category: "ricambi-usati" | "abbigliamento-accessori";
    compatibility?: string;
    condition?: string;
    image?: string | null;
}

function ProductCard({ product, onSelect }: { product: Product; onSelect: (p: Product) => void }) {
    return (
        <div className="card">
            <div
                style={{
                    height: "200px",
                    background: "#222",
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#555",
                    overflow: "hidden",
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                }}
            >
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                ) : (
                    "[FOTO PRODOTTO]"
                )}
            </div>
            <h3>{product.title}</h3>
            <p style={{
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                minHeight: "3em"
            }}>
                {product.description}
            </p>
            <div style={{ marginTop: "10px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                Condizione: <span style={{ color: "var(--accent-color)" }}>{product.condition || "Buono"}</span>
            </div>
            <div
                style={{
                    marginTop: "15px",
                    color: "var(--accent-color)",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                }}
            >
                € {product.price.toLocaleString("it-IT", { minimumFractionDigits: 2 })}
            </div>
            <button
                className="btn"
                style={{ marginTop: "15px", fontSize: "0.8rem", padding: "8px 16px", width: "100%" }}
                onClick={() => onSelect(product)}
            >
                Dettagli
            </button>
        </div>
    );
}

export default function Negozio() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("default");
    const [viewCategory, setViewCategory] = useState<"all" | "ricambi-usati" | "abbigliamento-accessori">("all");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/products");
                if (!response.ok) {
                    throw new Error("Errore nel caricamento dei prodotti");
                }
                const data = await response.json();
                setProducts(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = useMemo(() => {
        let result = [...products].filter(
            (p) =>
                p.title.toLowerCase().includes(search.toLowerCase()) ||
                p.description.toLowerCase().includes(search.toLowerCase())
        );

        if (filter === "price-asc") {
            result.sort((a, b) => a.price - b.price);
        } else if (filter === "price-desc") {
            result.sort((a, b) => b.price - a.price);
        } else if (filter === "az") {
            result.sort((a, b) => a.title.localeCompare(b.title));
        }

        return result;
    }, [search, filter, products]);

    if (loading) {
        return (
            <main className="container" style={{ paddingTop: "120px", textAlign: "center", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ color: "var(--text-secondary)" }}>Caricamento prodotti...</div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="container" style={{ paddingTop: "120px", textAlign: "center", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ color: "#ff6b6b" }}>Errore: {error}</div>
            </main>
        );
    }

    return (
        <main className="container" style={{ paddingTop: "120px" }}>
            <h1 className="section-title">Negozio Parti Usate</h1>
            <p style={{ textAlign: "center", color: "var(--text-secondary)", marginBottom: "30px" }}>
                Componenti selezionati e garantiti dal nostro team.
            </p>

            <div className="shop-controls">
                <input
                    type="text"
                    placeholder="Cerca prodotto..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="default">Ordina per...</option>
                    <option value="price-asc">Prezzo: Crescente</option>
                    <option value="price-desc">Prezzo: Decrescente</option>
                    <option value="az">A-Z</option>
                </select>
            </div>

            <div className="category-toggles">
                <button
                    className={`toggle-btn ${viewCategory === "all" ? "active" : ""}`}
                    onClick={() => setViewCategory("all")}
                >
                    Tutti
                </button>
                <button
                    className={`toggle-btn ${viewCategory === "ricambi-usati" ? "active" : ""}`}
                    onClick={() => setViewCategory("ricambi-usati")}
                >
                    Ricambi Usati
                </button>
                <button
                    className={`toggle-btn ${viewCategory === "abbigliamento-accessori" ? "active" : ""}`}
                    onClick={() => setViewCategory("abbigliamento-accessori")}
                >
                    Abbigliamento e Accessori
                </button>
            </div>

            <div className="shop-sections">
                {(viewCategory === "all" || viewCategory === "ricambi-usati") && (
                    <section style={{ marginBottom: "60px" }}>
                        <h2 className="section-subtitle" style={{ color: "var(--accent-color)", marginBottom: "30px", fontSize: "1.8rem", borderLeft: "4px solid var(--accent-color)", paddingLeft: "15px" }}>
                            Ricambi Usati
                        </h2>
                        <div className="cards">
                            {filteredProducts.filter(p => p.category === 'ricambi-usati').map((product) => (
                                <ProductCard key={product.id} product={product} onSelect={setSelectedProduct} />
                            ))}
                            {filteredProducts.filter(p => p.category === 'ricambi-usati').length === 0 && (
                                <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)", width: "100%", gridColumn: "1 / -1" }}>
                                    Nessun ricambio trovato.
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {(viewCategory === "all" || viewCategory === "abbigliamento-accessori") && (
                    <section style={{ marginBottom: "60px" }}>
                        <h2 className="section-subtitle" style={{ color: "var(--accent-color)", marginBottom: "30px", fontSize: "1.8rem", borderLeft: "4px solid var(--accent-color)", paddingLeft: "15px" }}>
                            Abbigliamento e Accessori
                        </h2>
                        <div className="cards">
                            {filteredProducts.filter(p => p.category === 'abbigliamento-accessori').map((product) => (
                                <ProductCard key={product.id} product={product} onSelect={setSelectedProduct} />
                            ))}
                            {filteredProducts.filter(p => p.category === 'abbigliamento-accessori').length === 0 && (
                                <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)", width: "100%", gridColumn: "1 / -1" }}>
                                    Nessun capo o accessorio trovato.
                                </div>
                            )}
                        </div>
                    </section>
                )}
            </div>


            {/* Modal */}
            {selectedProduct && (
                <div className="modal-overlay active" onClick={() => setSelectedProduct(null)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <span className="modal-close" onClick={() => setSelectedProduct(null)}>
                            &times;
                        </span>
                        <div id="modalContent">
                            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                                {selectedProduct.image ? (
                                    <img
                                        src={selectedProduct.image}
                                        alt={selectedProduct.title}
                                        style={{ maxWidth: "100%", maxHeight: "300px", borderRadius: "8px" }}
                                    />
                                ) : (
                                    <div style={{ height: "200px", background: "#222", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px" }}>
                                        [FOTO PRODOTTO]
                                    </div>
                                )}
                            </div>
                            <h3>{selectedProduct.title}</h3>
                            <div style={{ marginBottom: "15px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                                {selectedProduct.category && <span className="tag" style={{ background: "rgba(255, 255, 255, 0.1)", padding: "2px 8px", borderRadius: "4px", fontSize: "0.8rem" }}>{selectedProduct.category}</span>}
                                {selectedProduct.condition && <span className="tag" style={{ background: "rgba(255, 165, 0, 0.1)", color: "var(--accent-color)", padding: "2px 8px", borderRadius: "4px", fontSize: "0.8rem" }}>{selectedProduct.condition}</span>}
                            </div>
                            <p>{selectedProduct.description}</p>
                            {selectedProduct.compatibility && (
                                <p style={{ marginTop: "10px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                                    <strong>Compatibilità:</strong> {selectedProduct.compatibility}
                                </p>
                            )}
                            <div
                                style={{
                                    marginTop: "15px",
                                    color: "var(--accent-color)",
                                    fontWeight: "bold",
                                    fontSize: "1.2rem",
                                }}
                            >
                                € {selectedProduct.price.toLocaleString("it-IT", { minimumFractionDigits: 2 })}
                            </div>
                            <Link
                                href="/contatti"
                                className="btn"
                                style={{ marginTop: "20px", width: "100%", textAlign: "center" }}
                            >
                                Contattaci per acquistare
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
