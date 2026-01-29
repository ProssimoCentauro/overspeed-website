import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <Image
            src="/Logo-2.svg"
            className="hero-logo"
            alt="Overspeed Logo Large"
            width={550}
            height={275}
            priority
          />
          <h1>Prestazioni Oltre i Limiti</h1>
          <p>Officina specializzata, preparazione pista, e passione pura per le due ruote.</p>
          <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
            <Link href="/servizi" className="btn">
              I Nostri Servizi
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="features container">
        {/* Feature 1: Experience */}
        <div className="feature-row">
          <div className="feature-image">
            [FOTO ESPERIENZA]
          </div>
          <div className="feature-text">
            <h3>Esperienza</h3>
            <p>
              Anni di esperienza su strada e in pista ci permettono di capire al meglio le esigenze di ogni motociclista,
              garantendo interventi precisi e affidabili.
            </p>
          </div>
        </div>

        {/* Feature 2: Precision */}
        <div className="feature-row">
          <div className="feature-image">
            [FOTO PRECISIONE]
          </div>
          <div className="feature-text">
            <h3>Precisione</h3>
            <p>
              Utilizziamo strumentazione all&apos;avanguardia per diagnosi elettroniche e taratura sospensioni millimetrica.
              Nulla è lasciato al caso.
            </p>
          </div>
        </div>

        {/* Feature 3: Passion */}
        <div className="feature-row">
          <div className="feature-image">
            [FOTO PASSIONE]
          </div>
          <div className="feature-text">
            <h3>Passione</h3>
            <p>
              Trattiamo la tua moto come se fosse la nostra. La cura per i dettagli nasce dalla pura passione per le due
              ruote che ci guida ogni giorno.
            </p>
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section className="reviews-section">
        <div className="container">
          <h2 className="section-title">Cosa Dicono di Noi</h2>
          <div style={{ textAlign: "center", marginTop: "-20px", marginBottom: "40px" }}>
            <div className="review-stars" style={{ fontSize: "1.5rem", marginBottom: "10px" }}>★★★★★</div>
            <p style={{ color: "var(--text-secondary)" }}>Punteggio massimo basato su recensioni verificate di Google</p>
          </div>

          <div className="reviews-grid">
            {/* Review 1 */}
            <div className="review-card">
              <div className="review-header">
                <span className="review-author">Gabriele D.</span>
                <span className="review-stars">★★★★★</span>
              </div>
              <p className="review-text">
                &quot;Ambiente giovanile, cordiali, gentili, professionali.
                Sanno quello che fanno e dove mettere mano.
                Si percepisce la passione.
                Personalmente da possessore di tmax 530 vado solo da loro,mi hanno risolto un problema ed ora lo scooter va una bomba .
                Continuate così ragazzi super soddisfatto, consigliatissimo.&quot;
              </p>
              <div className="google-badge">
                <span>Recensione Verificata Google</span>
              </div>
            </div>

            {/* Review 2 */}
            <div className="review-card">
              <div className="review-header">
                <span className="review-author">Daniele C.</span>
                <span className="review-stars">★★★★★</span>
              </div>
              <p className="review-text">
                &quot;Portata una Honda CB900 Boldor per fare sistemare i carburatori e allineamento che più meccanici avevano provato a controllare senza riuscita. Lavoro ottimo ora è un'altra moto. Competenza e cordialità al primo posto sempre disponibili. Consigliatissimo&quot;
              </p>
              <div className="google-badge">
                <span>Recensione Verificata Google</span>
              </div>
            </div>

            {/* Review 3 */}
            <div className="review-card">
              <div className="review-header">
                <span className="review-author">Paolo R.</span>
                <span className="review-stars">★★★★★</span>
              </div>
              <p className="review-text">
                &quot;Pochi giorni fa sono stato indirizzato presso l'officina OVERSPEED. Marco e tutto il team si sono rivelati gentili, competenti e veramente efficienti. Risolto velocemente, impeccabilmente ed con un costo più che onesto, il problema con il quale combattevo dall'anno scorso. Che dire soddisfazione da 5 stelle almeno.&quot;
              </p>
              <div className="google-badge">
                <span>Recensione Verificata Google</span>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <Link
              href="https://www.google.com/maps/place/OVERSPEED+S.R.L.S./@41.7258246,12.6141128,17z/data=!4m8!3m7!1s0x13258fc685116f27:0xf8cfaacc0ba5ac2f!8m2!3d41.7258206!4d12.6166877!9m1!1b1!16s%2Fg%2F11t_vktg7y?entry=ttu&g_ep=EgoyMDI2MDEyMS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              className="toggle-btn"
              style={{ display: "inline-block", textDecoration: "none" }}
            >
              Leggi tutte le recensioni su Google
            </Link>
          </div>
        </div>
      </section>

      <div style={{ textAlign: "center", margin: "80px 0" }}>
        <Link href="/contatti" className="btn">
          Contattaci
        </Link>
      </div>
    </>
  );
}
