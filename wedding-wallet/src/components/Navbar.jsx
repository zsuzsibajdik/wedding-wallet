import { useState } from "react";
import { NavLink } from "react-router-dom";
import { auth } from "../firebase"
import { useContext } from "react";
import { SignInContext } from "./SignInContext";
import { signOut } from "firebase/auth";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {signedIn, setSignedIn} = useContext(SignInContext);
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
          {signedIn ? (<li>
             <button to="/" onClick={() => {
                signOut(auth)
                setSignedIn(false)
                setIsMenuOpen(false)
              }}>Sign out</button>
          </li>
          ) : (
              <li>
                <NavLink to="/signup" className="navbutton" onClick={() => setIsMenuOpen(false)}>
                Sign Up
                </NavLink>
              </li>
              )}
          {!signedIn && <li>
                <NavLink to="/signin" className="navbutton" onClick={() => setIsMenuOpen(false)}>
                Sign In
                </NavLink>
              </li>  }
        </ul>

      </div>
    </nav>
  );
}

export default Navbar;