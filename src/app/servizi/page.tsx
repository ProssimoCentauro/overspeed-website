"use client";

import { useState } from "react";
import Link from "next/link";

interface ServiceItemProps {
    title: string;
    description: string;
    image?: string;
}

function ServiceItem({ title, description, image }: ServiceItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`service-item ${isOpen ? "active" : ""}`} onClick={() => setIsOpen(!isOpen)}>
            {image && (
                <div className="service-image-container">
                    <img src={image} alt={title} className="service-card-image" />
                </div>
            )}
            <div className="service-content">
                <div className="service-header">
                    <span>{title}</span>
                    <div className="service-toggle">▼</div>
                </div>
                <div className="service-description">
                    {description}
                </div>
            </div>
        </div>
    );
}

export default function Servizi() {
    const services = [
        {
            title: "Meccanica moto",
            description: "Interventi di meccanica generale su motore, trasmissione e ciclistica per ogni tipo di moto.",
            image: "/placeholder-service.jpg"
        },
        {
            title: "Tagliandi",
            description: "Cambi olio, filtri e controlli periodici per mantenere la tua moto sempre efficiente.",
            image: "/placeholder-service.jpg"
        },
        {
            title: "Diagnosi elettronica",
            description: "Utilizzo di strumentazione diagnostica di ultima generazione per individuare e risolvere guasti elettronici.",
            image: "/placeholder-service.jpg"
        },
        {
            title: "Ricalibrazione centralina",
            description: "Ottimizzazione delle prestazioni motore tramite ricalibrazione strumentale di ogni singolo sensore.",
            image: "/placeholder-service.jpg"
        },
        {
            title: "Revisione / taratura personalizzata sospensioni",
            description: "Revisione completa di forcelle e monoammortizzatori con taratura su misura per il tuo stile di guida.",
            image: "/placeholder-service.jpg"
        },
        {
            title: "Cambio gomme",
            description: "Vendita e montaggio pneumatici delle migliori marche con bilanciatura di precisione.",
            image: "/placeholder-service.jpg"
        },
        {
            title: "Revisione M.C.T.C. / pre-revisione",
            description: "Preparazione del veicolo e gestione completa della pratica di revisione periodica obbligatoria.",
            image: "/placeholder-service.jpg"
        },
        {
            title: "Installazione accessori (es. antifurti, scarichi)",
            description: "Montaggio professionale di componenti aftermarket, scarichi sportivi, antifurti e parti speciali.",
            image: "/placeholder-service.jpg"
        },
        {
            title: "Preparazione pista",
            description: "Allestimento completo moto da competizione: carene, elettronica, ciclistica e motore.",
            image: "/placeholder-service.jpg"
        },
        {
            title: "Soccorso / ritiro a domicilio (se previsto)",
            description: "Servizio di recupero moto in panne o ritiro/consegna a domicilio per manutenzione.",
            image: "/placeholder-service.jpg"
        },
        {
            title: "Vendita accessori e ricambi nuovi ed usati",
            description: "Ampia disponibilità di ricambi originali e aftermarket, oltre a un'ampia selezione di usato garantito.",
            image: "/placeholder-service.jpg"
        },
        {
            title: "Conto-vendita mezzi usati",
            description: "Vendi la tua moto affidandola a noi: esposizione nel nostro showroom e gestione della trattativa.",
            image: "/placeholder-service.jpg"
        }
    ];

    return (
        <main className="container" style={{ paddingTop: "120px" }}>
            <h1 className="section-title">I Nostri Servizi</h1>
            <div className="service-list">
                {services.map((service, index) => (
                    <ServiceItem
                        key={index}
                        title={service.title}
                        description={service.description}
                        image={service.image}
                    />
                ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <p style={{ marginBottom: "20px", color: "var(--text-secondary)" }}>Hai bisogno di una consulenza specifica?</p>
                <Link href="/contatti" className="btn">
                    Richiedi Informazioni
                </Link>
            </div>
        </main>
    );
}
