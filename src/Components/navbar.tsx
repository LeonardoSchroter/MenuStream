import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
    openCart(): void; // Função para abrir o carrinho
}

export const Navbar: React.FC<NavbarProps> = ({ openCart }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Menu</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">Products</Link>
                        </li>
                    </ul>
                    <button className="btn btn-outline-primary me-2" onClick={openCart}>Cart</button> {/* Botão para abrir o carrinho */}
                </div>
            </div>
        </nav>
    );
};
