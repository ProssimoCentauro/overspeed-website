"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Chi Siamo", href: "/chi-siamo" },
    { name: "Servizi", href: "/servizi" },
    { name: "Negozio", href: "/negozio" },
    { name: "Contatti", href: "/contatti" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link href="/">
            <Image
              src="/logo-overspeed-nobg.svg"
              alt="Overspeed Logo"
              width={60}
              height={52}
              priority
            />
          </Link>
        </div>
        <div className="menu-toggle" onClick={toggleMenu}>
          ☰
        </div>
        <nav>
          <ul className={isMenuOpen ? "show" : ""}>
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={isActive(item.href) ? "active" : ""}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
