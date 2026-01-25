"use client";

import { Product } from "@/lib/products";
import Image from "next/image";

interface ProductListProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
}

export default function ProductList({ products, onEdit, onDelete }: ProductListProps) {
    return (
        <div style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "12px",
            overflow: "hidden",
        }}>
            <div style={{
                overflowX: "auto",
            }}>
                <table style={{
                    width: "100%",
                    borderCollapse: "collapse",
                }}>
                    <thead>
                        <tr style={{
                            background: "rgba(255, 255, 255, 0.05)",
                            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                        }}>
                            <th style={{ padding: "15px", textAlign: "left", color: "var(--accent-color)" }}>Immagine</th>
                            <th style={{ padding: "15px", textAlign: "left", color: "var(--accent-color)" }}>Titolo</th>
                            <th style={{ padding: "15px", textAlign: "left", color: "var(--accent-color)" }}>Categoria</th>
                            <th style={{ padding: "15px", textAlign: "left", color: "var(--accent-color)" }}>Prezzo</th>
                            <th style={{ padding: "15px", textAlign: "left", color: "var(--accent-color)" }}>Condizione</th>
                            <th style={{ padding: "15px", textAlign: "left", color: "var(--accent-color)" }}>Stock</th>
                            <th style={{ padding: "15px", textAlign: "center", color: "var(--accent-color)" }}>Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={7} style={{
                                    padding: "40px",
                                    textAlign: "center",
                                    color: "var(--text-secondary)",
                                }}>
                                    Nessun prodotto trovato
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr
                                    key={product.id}
                                    style={{
                                        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                                        transition: "background 0.2s",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "transparent";
                                    }}
                                >
                                    <td style={{ padding: "15px" }}>
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    objectFit: "cover",
                                                    borderRadius: "8px",
                                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                                }}
                                            />
                                        ) : (
                                            <div style={{
                                                width: "60px",
                                                height: "60px",
                                                background: "rgba(255, 255, 255, 0.05)",
                                                borderRadius: "8px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "var(--text-secondary)",
                                                fontSize: "0.7rem",
                                            }}>
                                                No img
                                            </div>
                                        )}
                                    </td>
                                    <td style={{ padding: "15px", color: "var(--text-color)" }}>
                                        <div style={{ fontWeight: "500" }}>{product.title}</div>
                                        <div style={{
                                            fontSize: "0.85rem",
                                            color: "var(--text-secondary)",
                                            marginTop: "4px",
                                            maxWidth: "300px",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        }}>
                                            {product.description}
                                        </div>
                                    </td>
                                    <td style={{ padding: "15px", color: "var(--text-color)" }}>
                                        {product.category || "-"}
                                    </td>
                                    <td style={{ padding: "15px", color: "var(--accent-color)", fontWeight: "600" }}>
                                        €{product.price.toFixed(2)}
                                    </td>
                                    <td style={{ padding: "15px" }}>
                                        <span style={{
                                            padding: "4px 12px",
                                            borderRadius: "12px",
                                            fontSize: "0.85rem",
                                            background: product.condition === "Eccellente"
                                                ? "rgba(34, 197, 94, 0.2)"
                                                : product.condition === "Buono"
                                                    ? "rgba(59, 130, 246, 0.2)"
                                                    : "rgba(251, 191, 36, 0.2)",
                                            color: product.condition === "Eccellente"
                                                ? "#22c55e"
                                                : product.condition === "Buono"
                                                    ? "#3b82f6"
                                                    : "#fbbf24",
                                        }}>
                                            {product.condition}
                                        </span>
                                    </td>
                                    <td style={{ padding: "15px" }}>
                                        <span style={{
                                            padding: "4px 12px",
                                            borderRadius: "12px",
                                            fontSize: "0.85rem",
                                            background: product.inStock
                                                ? "rgba(34, 197, 94, 0.2)"
                                                : "rgba(239, 68, 68, 0.2)",
                                            color: product.inStock ? "#22c55e" : "#ef4444",
                                        }}>
                                            {product.inStock ? "Disponibile" : "Esaurito"}
                                        </span>
                                    </td>
                                    <td style={{ padding: "15px" }}>
                                        <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                                            <button
                                                onClick={() => onEdit(product)}
                                                style={{
                                                    padding: "8px 16px",
                                                    background: "rgba(59, 130, 246, 0.2)",
                                                    border: "1px solid rgba(59, 130, 246, 0.3)",
                                                    borderRadius: "6px",
                                                    color: "#3b82f6",
                                                    cursor: "pointer",
                                                    fontSize: "0.85rem",
                                                    transition: "all 0.2s",
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = "rgba(59, 130, 246, 0.3)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = "rgba(59, 130, 246, 0.2)";
                                                }}
                                            >
                                                Modifica
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (confirm(`Sei sicuro di voler eliminare "${product.title}"?`)) {
                                                        onDelete(product.id);
                                                    }
                                                }}
                                                style={{
                                                    padding: "8px 16px",
                                                    background: "rgba(239, 68, 68, 0.2)",
                                                    border: "1px solid rgba(239, 68, 68, 0.3)",
                                                    borderRadius: "6px",
                                                    color: "#ef4444",
                                                    cursor: "pointer",
                                                    fontSize: "0.85rem",
                                                    transition: "all 0.2s",
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = "rgba(239, 68, 68, 0.3)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)";
                                                }}
                                            >
                                                Elimina
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
