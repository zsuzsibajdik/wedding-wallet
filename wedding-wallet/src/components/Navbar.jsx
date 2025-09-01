import { useState } from "react";
import { NavLink } from "react-router-dom";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
          The Wedding Wallet
        </NavLink>
      </div>
      <div className="menu-toggle" onClick={toggleMenu}>
        ☰
      </div>
      <div className={`navbar-center ${isMenuOpen ? "active" : ""}`}>
        <ul className="nav-links">
          <li>
            <NavLink to="/vendors" className="navbutton" onClick={() => setIsMenuOpen(false)}>
              Vendors
            </NavLink>
          </li>
          <li>
            <NavLink to="/calculator" className="navbutton" onClick={() => setIsMenuOpen(false)}>
              Expense calculator
            </NavLink>
          </li>
          <li>
            <NavLink to="/todos" className="navbutton" onClick={() => setIsMenuOpen(false)}>
              Tasks
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;