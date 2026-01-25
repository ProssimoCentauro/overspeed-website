"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
}

export default function Negozio() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("default");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const products: Product[] = [
        {
            id: 1,
            title: "Scarico Titanio Racing",
            description: "Compatibile con CBR 1000RR 2018+. Condizioni eccellenti.",
            price: 450,
        },
        {
            id: 2,
            title: "Monoammortizzatore Ohlins",
            description: "Revisionato da noi. Molla 95N/mm.",
            price: 800,
        },
        {
            id: 3,
            title: "Centralina Rapid Bike",
            description: "Cablaggio incluso per Yamaha R1/R6.",
            price: 250,
        },
        {
            id: 4,
            title: "Cerchi Marchesini Forgiati",
            description: "Coppia cerchi, qualche segno di usura. Dritti.",
            price: 1200,
        },
    ];

    const filteredProducts = useMemo(() => {
        let result = products.filter(
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
    }, [search, filter]);

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

            <div className="cards">
                {filteredProducts.map((product) => (
                    <div className="card" key={product.id}>
                        <div
                            style={{
                                height: "150px",
                                background: "#222",
                                marginBottom: "20px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#555",
                            }}
                        >
                            [FOTO PRODOTTO]
                        </div>
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
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
                            style={{ marginTop: "15px", fontSize: "0.8rem", padding: "8px 16px" }}
                            onClick={() => setSelectedProduct(product)}
                        >
                            Dettagli
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedProduct && (
                <div className="modal-overlay active" onClick={() => setSelectedProduct(null)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <span className="modal-close" onClick={() => setSelectedProduct(null)}>
                            &times;
                        </span>
                        <div id="modalContent">
                            <h3>{selectedProduct.title}</h3>
                            <p>{selectedProduct.description}</p>
                            <p style={{ marginTop: "10px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                                (Qui potremmo aggiungere dettagli tecnici più specifici, foto aggiuntive, o stato di conservazione dettagliato.)
                            </p>
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
