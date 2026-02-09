"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ContactForm() {
    const searchParams = useSearchParams();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    useEffect(() => {
        const subjectParam = searchParams.get("subject");
        const messageParam = searchParams.get("message");

        if (subjectParam || messageParam) {
            setFormData(prev => ({
                ...prev,
                subject: subjectParam || prev.subject,
                message: messageParam || prev.message
            }));
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const response = await fetch("/api/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", subject: "", message: "" });
                alert(`Grazie ${formData.name}! Il tuo messaggio è stato inviato. Ti risponderemo a breve.`);
            } else {
                setStatus("error");
                alert("Si è verificato un errore durante l'invio del messaggio. Riprova più tardi.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setStatus("error");
            alert("Si è verificato un errore di rete. Riprova più tardi.");
        } finally {
            setStatus("idle");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    return (
        <div className="contact-grid">
            <div className="contact-info">
                <h3>Vieni a trovarci</h3>
                <p>
                    Siamo pronti ad accogliere la tua moto con la passione che merita.
                    Passa in officina per un preventivo o semplicemente per fare due chiacchiere.
                </p>

                <p>
                    <strong>Indirizzo:</strong><br />
                    Via Tiziano 9/A<br />
                    Pavona di Castel Gandolfo (RM), 00073
                </p>

                <p>
                    <strong>Orari:</strong><br />
                    Lun - Ven: 09:00 - 13:00 / 15:00 - 19:00<br />
                    Sab: 09:00 - 13:00
                </p>

                <div style={{ marginBottom: "20px" }}>
                    <strong>Contatti diretti:</strong><br />
                    Tel/WhatsApp: 06 8911 2647<br />
                    Email: OVERSPEED.SRLS@GMAIL.COM<br />
                    PEC: OVERSPEEDMOTO@PEC.IT
                </div>

                <div className="social-buttons">
                    <a href="tel:0689112647" className="btn btn-blue">
                        Chiamaci
                    </a>
                    <a
                        href="https://wa.me/390689112647"
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
                        height: "400px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        boxShadow: "0 0 20px rgba(255, 102, 0, 0.2)",
                    }}
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3004.765!2d12.616687!3d41.725821!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13258fc685116f27%3A0xf8cfaacc0ba5ac2f!2sOVERSPEED%20S.R.L.S.!5e0!3m2!1sit!2sit!4v1737836100000!5m2!1sit!2sit"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="OVERSPEED S.R.L.S. Location"
                    ></iframe>

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
                    <button type="submit" className="btn" disabled={status === "loading"}>
                        {status === "loading" ? "Invio in corso..." : "Invia Messaggio"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default function Contatti() {
    return (
        <main className="container" style={{ paddingTop: "120px" }}>
            <h1 className="section-title">Contattaci</h1>
            <Suspense fallback={<div className="text-center text-white">Caricamento modulo contatti...</div>}>
                <ContactForm />
            </Suspense>
        </main>
    );
}
