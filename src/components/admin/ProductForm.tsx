"use client";

import { useState } from "react";
import { Product } from "@/lib/products";

interface ProductFormProps {
    product?: Product | null;
    onSave: (product: Partial<Product>) => Promise<void>;
    onCancel: () => void;
}

export default function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
    const [formData, setFormData] = useState({
        title: product?.title || "",
        description: product?.description || "",
        price: product?.price || 0,
        category: product?.category || "",
        compatibility: product?.compatibility || "",
        condition: product?.condition || "Buono",
        inStock: product?.inStock !== false,
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(product?.image || null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            let imageUrl = product?.image || null;

            // Upload immagine se presente
            if (imageFile) {
                const token = localStorage.getItem("adminToken");
                const uploadFormData = new FormData();
                uploadFormData.append("file", imageFile);

                const uploadResponse = await fetch("/api/upload", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: uploadFormData,
                });

                if (!uploadResponse.ok) {
                    throw new Error("Errore durante l'upload dell'immagine");
                }

                const uploadData = await uploadResponse.json();
                imageUrl = uploadData.url;
            }

            // Salva prodotto
            await onSave({
                ...formData,
                image: imageUrl,
            });
        } catch (err: any) {
            setError(err.message || "Errore durante il salvataggio");
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "12px",
            padding: "30px",
            marginBottom: "30px",
        }}>
            <h2 style={{ marginBottom: "20px", color: "var(--accent-color)" }}>
                {product ? "Modifica Prodotto" : "Nuovo Prodotto"}
            </h2>

            {error && (
                <div style={{
                    padding: "12px",
                    background: "rgba(255, 0, 0, 0.1)",
                    border: "1px solid rgba(255, 0, 0, 0.3)",
                    borderRadius: "6px",
                    color: "#ff6b6b",
                    marginBottom: "20px",
                }}>
                    {error}
                </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                <div>
                    <label style={{ display: "block", marginBottom: "8px", color: "var(--text-color)" }}>
                        Titolo *
                    </label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            background: "rgba(0, 0, 0, 0.3)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "6px",
                            color: "var(--text-color)",
                        }}
                    />
                </div>

                <div>
                    <label style={{ display: "block", marginBottom: "8px", color: "var(--text-color)" }}>
                        Prezzo (€) *
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            background: "rgba(0, 0, 0, 0.3)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "6px",
                            color: "var(--text-color)",
                        }}
                    />
                </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", color: "var(--text-color)" }}>
                    Descrizione *
                </label>
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={4}
                    style={{
                        width: "100%",
                        padding: "10px",
                        background: "rgba(0, 0, 0, 0.3)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "6px",
                        color: "var(--text-color)",
                        resize: "vertical",
                    }}
                />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                <div>
                    <label style={{ display: "block", marginBottom: "8px", color: "var(--text-color)" }}>
                        Categoria
                    </label>
                    <input
                        type="text"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        style={{
                            width: "100%",
                            padding: "10px",
                            background: "rgba(0, 0, 0, 0.3)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "6px",
                            color: "var(--text-color)",
                        }}
                    />
                </div>

                <div>
                    <label style={{ display: "block", marginBottom: "8px", color: "var(--text-color)" }}>
                        Compatibilità
                    </label>
                    <input
                        type="text"
                        value={formData.compatibility}
                        onChange={(e) => setFormData({ ...formData, compatibility: e.target.value })}
                        style={{
                            width: "100%",
                            padding: "10px",
                            background: "rgba(0, 0, 0, 0.3)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "6px",
                            color: "var(--text-color)",
                        }}
                    />
                </div>

                <div>
                    <label style={{ display: "block", marginBottom: "8px", color: "var(--text-color)" }}>
                        Condizione
                    </label>
                    <select
                        value={formData.condition}
                        onChange={(e) => setFormData({ ...formData, condition: e.target.value as any })}
                        style={{
                            width: "100%",
                            padding: "10px",
                            background: "rgba(0, 0, 0, 0.3)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "6px",
                            color: "var(--text-color)",
                        }}
                    >
                        <option value="Eccellente">Eccellente</option>
                        <option value="Buono">Buono</option>
                        <option value="Discreto">Discreto</option>
                    </select>
                </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", color: "var(--text-color)" }}>
                    Immagine Prodotto
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{
                        width: "100%",
                        padding: "10px",
                        background: "rgba(0, 0, 0, 0.3)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "6px",
                        color: "var(--text-color)",
                    }}
                />
                {imagePreview && (
                    <div style={{ marginTop: "10px" }}>
                        <img
                            src={imagePreview}
                            alt="Preview"
                            style={{
                                maxWidth: "200px",
                                maxHeight: "200px",
                                borderRadius: "8px",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                            }}
                        />
                    </div>
                )}
            </div>

            <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "flex", alignItems: "center", color: "var(--text-color)", cursor: "pointer" }}>
                    <input
                        type="checkbox"
                        checked={formData.inStock}
                        onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                        style={{ marginRight: "8px" }}
                    />
                    Disponibile in magazzino
                </label>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
                <button
                    type="submit"
                    disabled={loading}
                    className="btn"
                    style={{
                        flex: 1,
                        opacity: loading ? 0.6 : 1,
                        cursor: loading ? "not-allowed" : "pointer",
                    }}
                >
                    {loading ? "Salvataggio..." : "Salva"}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    style={{
                        flex: 1,
                        padding: "12px 24px",
                        background: "rgba(255, 255, 255, 0.1)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: "8px",
                        color: "var(--text-color)",
                        cursor: loading ? "not-allowed" : "pointer",
                        opacity: loading ? 0.6 : 1,
                    }}
                >
                    Annulla
                </button>
            </div>
        </form>
    );
}
