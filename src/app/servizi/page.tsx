"use client";

import { useState } from "react";
import Link from "next/link";

interface ServiceItemProps {
    title: string;
    description: string;
}

function ServiceItem({ title, description }: ServiceItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`service-item ${isOpen ? "active" : ""}`} onClick={() => setIsOpen(!isOpen)}>
            <div className="service-header">
                <span>{title}</span>
                <div className="service-toggle">▼</div>
            </div>
            <div className="service-description">
                {description}
            </div>
        </div>
    );
}

export default function Servizi() {
    const services = [
        {
            title: "Meccanica moto",
            description: "Interventi di meccanica generale su motore, trasmissione e ciclistica per ogni tipo di moto."
        },
        {
            title: "Tagliandi",
            description: "Cambi olio, filtri e controlli periodici per mantenere la tua moto sempre efficiente."
        },
        {
            title: "Diagnosi elettronica",
            description: "Utilizzo di strumentazione diagnostica di ultima generazione per individuare e risolvere guasti elettronici."
        },
        {
            title: "Ricalibrazione centralina",
            description: "Ottimizzazione delle prestazioni del motore tramite rimappatura della centralina originale o aggiuntiva."
        },
        {
            title: "Revisione / taratura personalizzata sospensioni",
            description: "Revisione completa di forcelle e monoammortizzatori con taratura su misura per il tuo stile di guida."
        },
        {
            title: "Cambio gomme",
            description: "Vendita e montaggio pneumatici delle migliori marche con bilanciatura di precisione."
        },
        {
            title: "Revisione M.C.T.C. / pre-revisione",
            description: "Preparazione del veicolo e gestione completa della pratica di revisione periodica obbligatoria."
        },
        {
            title: "Installazione accessori (es. antifurti, scarichi)",
            description: "Montaggio professionale di componenti aftermarket, scarichi sportivi, antifurti e parti speciali."
        },
        {
            title: "Preparazione pista",
            description: "Allestimento completo moto da competizione: carene, elettronica, ciclistica e motore."
        },
        {
            title: "Soccorso / ritiro a domicilio (se previsto)",
            description: "Servizio di recupero moto in panne o ritiro/consegna a domicilio per manutenzione."
        },
        {
            title: "Vendita accessori e ricambi nuovi ed usati",
            description: "Ampia disponibilità di ricambi originali e aftermarket, oltre a un'ampia selezione di usato garantito."
        },
        {
            title: "Conto-vendita mezzi usati",
            description: "Vendi la tua moto affidandola a noi: esposizione nel nostro showroom e gestione della trattativa."
        }
    ];

    return (
        <main className="container" style={{ paddingTop: "120px" }}>
            <h1 className="section-title">I Nostri Servizi</h1>
            <div className="service-list">
                {services.map((service, index) => (
                    <ServiceItem key={index} title={service.title} description={service.description} />
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
