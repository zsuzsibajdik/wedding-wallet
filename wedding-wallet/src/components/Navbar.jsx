import { useState } from "react";

export function Navbar({onHome, onVendor, onCalculate, onTodo}){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    return(
        <>
            <nav className="navbar">
                <div className="navbar-left">
                    <a href="#" onClick={onHome} className="logo">
                    The Wedding Wallet
                    </a>
                </div>
                <div className="menu-toggle" onClick={toggleMenu}>
                    ☰
                </div>
                <div className={`navbar-center ${isMenuOpen ? "active" : ""}`}>
                    <ul className="nav-links">
                    <li>
                        <a href="#" className="navbutton" onClick={onVendor}>Vendors</a>
                    </li>
                    <li>
                        <a href="#" className="navbutton" onClick={onCalculate}>Expense calculator</a>
                    </li>
                    <li>
                        <a href="#" className="navbutton" onClick={onTodo}>Tasks</a>
                    </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}