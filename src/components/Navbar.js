import React from 'react';
import { Link } from 'react-router-dom';
import CartIcon from './CartIcon';
import productos from '../data/productos.json';

function Navbar() {
  const uniqueCategories = [...new Set(productos.map(p => p.category))];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Mi Tienda</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {uniqueCategories.map((category, index) => (
              <li key={index} className="nav-item">
                <Link className="nav-link" to={`/category/${category}`}>{category}</Link>
              </li>
            ))}
          </ul>
          <CartIcon />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;