"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("/api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Errore durante il login");
                setLoading(false);
                return;
            }

            // Salva token in localStorage
            localStorage.setItem("adminToken", data.token);

            // Redirect al dashboard
            router.push("/admin");
        } catch (error) {
            setError("Errore di connessione");
            setLoading(false);
        }
    };

    return (
        <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-color)" }}>
            <div style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                padding: "40px",
                width: "100%",
                maxWidth: "400px",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}>
                <h1 style={{
                    textAlign: "center",
                    marginBottom: "30px",
                    color: "var(--accent-color)",
                    fontSize: "2rem",
                }}>
                    Admin Login
                </h1>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "20px" }}>
                        <label htmlFor="password" style={{
                            display: "block",
                            marginBottom: "8px",
                            color: "var(--text-color)",
                            fontSize: "0.9rem",
                        }}>
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: "100%",
                                padding: "12px",
                                background: "rgba(0, 0, 0, 0.3)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "6px",
                                color: "var(--text-color)",
                                fontSize: "1rem",
                            }}
                            placeholder="Inserisci la password admin"
                        />
                    </div>

                    {error && (
                        <div style={{
                            padding: "12px",
                            background: "rgba(255, 0, 0, 0.1)",
                            border: "1px solid rgba(255, 0, 0, 0.3)",
                            borderRadius: "6px",
                            color: "#ff6b6b",
                            marginBottom: "20px",
                            fontSize: "0.9rem",
                        }}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn"
                        style={{
                            width: "100%",
                            padding: "14px",
                            fontSize: "1rem",
                            opacity: loading ? 0.6 : 1,
                            cursor: loading ? "not-allowed" : "pointer",
                        }}
                    >
                        {loading ? "Accesso in corso..." : "Accedi"}
                    </button>
                </form>

            </div>
        </main>
    );
}
