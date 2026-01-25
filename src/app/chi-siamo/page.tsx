export default function ChiSiamo() {
    return (
        <main className="container" style={{ paddingTop: "120px" }}>
            <h1 className="section-title">Chi Siamo</h1>
            <div className="story-content">
                <p>
                    Overspeed nasce il 16 marzo 2023 a Pavona di Castel Gandolfo, con l&apos;obiettivo di offrire un punto di
                    riferimento serio e affidabile per chi ama le due ruote.
                </p>
                <p>
                    Siamo un&apos;officina specializzata in moto e scooter, che mette al centro del proprio lavoro tre valori
                    fondamentali: attenzione, velocità e trasparenza. Ogni mezzo che entra nella nostra officina viene
                    trattato con cura e competenza, come se fosse il nostro.
                </p>
                <p>
                    Offriamo manutenzione ordinaria e straordinaria, riparazioni, diagnosi elettroniche, montaggio accessori,
                    preparazioni ed elaborazioni, sempre con un occhio attento alle esigenze del cliente e alle tempistiche.
                </p>
                <p>
                    Non siamo solo meccanici, siamo piloti. Capiamo cosa significa affidarsi al proprio mezzo a grandi
                    velocità. Per questo, ogni vite che stringiamo, ogni diagnosi che eseguiamo, è trattata con la massima cura e
                    dedizione.
                </p>
                <p>
                    Che tu abbia bisogno di un semplice tagliando o di un intervento più complesso, Overspeed è il posto
                    giusto per rimettere in moto la tua passione.
                </p>
            </div>

            <div style={{ marginTop: "50px", marginBottom: "50px" }}>
                <h2 className="section-title" style={{ fontSize: "2rem", marginBottom: "30px" }}>Dove Siamo</h2>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3004.765329123456!2d12.614687!3d41.725821!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13258fc685116f27%3A0xf8cfaacc0ba5ac2f!2sOVERSPEED%20S.R.L.S.!5e0!3m2!1sit!2sit!4v1737836100000!5m2!1sit!2sit"
                    width="100%"
                    height="450"
                    style={{ border: 0, borderRadius: "8px", boxShadow: "0 0 20px rgba(255, 102, 0, 0.2)" }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="OVERSPEED S.R.L.S. Location"
                ></iframe>
            </div>

        </main>
    );
}
