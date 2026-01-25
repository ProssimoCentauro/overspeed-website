import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <Image
            src="/logo-overspeed.png"
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

      <div style={{ textAlign: "center", margin: "50px 0" }}>
        <Link href="/contatti" className="btn">
          Contattaci
        </Link>
      </div>
    </>
  );
}
