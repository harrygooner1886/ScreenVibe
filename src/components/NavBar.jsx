import { Link } from "react-router-dom";
import { useState } from "react";
import "../css/Navbar.css";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src="/ScreenVibe_Logo.png" alt="ScreenVibe Logo" className="logo" />
        <Link to="/">
          <span className="logo-text">ScreenVibe</span>
        </Link>
      </div>

      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/watchlist" className="nav-link" onClick={() => setMenuOpen(false)}>My Watchlist</Link>
      </div>
    </nav>
  );
}

export default NavBar;
