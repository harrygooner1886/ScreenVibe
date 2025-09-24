import { Link } from "react-router-dom";
import "../css/Navbar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src="/ScreenVibe_Logo.png" alt="ScreenVibe Logo" className="logo" />
        <Link to="/">
          <span className="logo-text">ScreenVibe</span>
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/watchlist" className="nav-link">My Watchlist</Link>
      </div>
    </nav>
  );
}

export default NavBar;
