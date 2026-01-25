export default function Footer() {
    return (
        <footer>
            <div className="container">
                <p>&copy; {new Date().getFullYear()} Overspeed Officina. Tutti i diritti riservati.</p>
                <p style={{ marginTop: "10px", fontSize: "0.9rem" }}>
                    Via della Velocità, 58 - 20100 Milano (MI) | Tel: +39 02 1234567 |
                    Email: info@overspeed.it
                </p>
            </div>
        </footer>
    );
}
