"use client";

import { useState } from "react";

export default function Contatti() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Grazie ${formData.name}! Il tuo messaggio è stato inviato. Ti risponderemo a breve.`);
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    return (
        <main className="container" style={{ paddingTop: "120px" }}>
            <h1 className="section-title">Contattaci</h1>
            <div className="contact-grid">
                <div className="contact-info">
                    <h3>Vieni a trovarci</h3>
                    <p>
                        Siamo pronti ad accogliere la tua moto con la passione che merita.
                        Passa in officina per un preventivo o semplicemente per fare due chiacchiere.
                    </p>

                    <p>
                        <strong>Indirizzo:</strong><br />
                        Via della Velocità, 58<br />
                        20100 Milano (MI)
                    </p>

                    <p>
                        <strong>Orari:</strong><br />
                        Lun - Ven: 08:30 - 18:30<br />
                        Sab: 09:00 - 13:00
                    </p>

                    <div style={{ marginBottom: "20px" }}>
                        <strong>Contatti diretti:</strong><br />
                        Tel: +39 02 1234567
                    </div>

                    <div className="social-buttons">
                        <a href="tel:+39021234567" className="btn btn-blue">
                            Chiamaci
                        </a>
                        <a
                            href="https://wa.me/391234567890?text=Salve,%20vorrei%20maggiori%20informazioni"
                            className="btn whatsapp-btn"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            WhatsApp
                        </a>
                        <a
                            href="https://instagram.com/OVER.SPEED2023"
                            className="btn btn-insta"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Instagram
                        </a>
                    </div>

                    <div
                        style={{
                            marginTop: "30px",
                            height: "300px",
                            background: "#222",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#555",
                        }}
                    >
                        [MAPPA GOOGLE PLACEHOLDER]
                    </div>
                </div>

                <div className="contact-form-wrapper">
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Nome</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Il tuo nome"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="La tua email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">Oggetto</label>
                            <input
                                type="text"
                                id="subject"
                                placeholder="Richiesta informazioni..."
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Messaggio</label>
                            <textarea
                                id="message"
                                rows={5}
                                placeholder="Scrivi qui il tuo messaggio..."
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn">
                            Invia Messaggio
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
