
import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About Us" },
  { to: "/condition-we-treat", label: "Conditions We Treat" },
  { to: "/our-membership", label: "Our Membership" },
  { to: "/patient-history", label: "Patient History" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const headerRef = useRef(null);

  // Scroll par navbar shrink + shadow + neeche ki border me progress
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
      headerRef.current?.style.setProperty("--progress", progress.toFixed(1));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu open ho to page scroll lock
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      className={`physio-header ${scrolled ? "scrolled" : ""}`}
    >
      <nav className="physio-navbar">
        <Link to="/" className="physio-logo" onClick={closeMenu}>
          <img src={logo} alt="Physiotherapy Logo" />
        </Link>

        <button
          className={`physio-menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`physio-nav-links ${menuOpen ? "active" : ""}`}>
          {links.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className="physio-link"
              style={{ "--i": i }}
              onClick={closeMenu}
            >
              {item.label}
            </NavLink>
          ))}

          <Link
            to="/book-appointment"
            className="physio-appointment-btn"
            style={{ "--i": links.length }}
            onClick={closeMenu}
          >
            Book Appointment <span className="arrow">↗</span>
          </Link>
        </div>
      </nav>

      {/* Neeche ki animated border + scroll progress */}
      <span className="physio-border" aria-hidden="true" />
    </header>
  );
};

export default Navbar;