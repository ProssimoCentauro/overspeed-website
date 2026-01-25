export default function Footer() {
    return (
        <footer>
            <div className="container">
                <p>&copy; {new Date().getFullYear()} Overspeed Officina. Tutti i diritti riservati.</p>
                <p style={{ marginTop: "10px", fontSize: "0.9rem" }}>
                    Via Tiziano 9/A - Pavona di Castel Gandolfo (RM) | Tel: 06 8911 2647 |
                    Email: OVERSPEED.SRLS@GMAIL.COM
                </p>
            </div>
        </footer>
    );
}
