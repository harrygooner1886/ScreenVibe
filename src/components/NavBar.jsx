import { Link } from "react-router-dom";
import "../css/Navbar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Movie App</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        {/* 👇 Update this line */}
        <Link to="/watchlist" className="nav-link">My Watchlist</Link>
      </div>
    </nav>
  );
}

export default NavBar;
