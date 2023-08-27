import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import productos from '../data/productos.json';
import { useCart } from '../contexts/CartContext';
import '../App.css';

function ItemListContainer() {

  const { categoryId } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { addToCart, removeFromCart, cart, stock } = useCart();
  const [productQuantities, setProductQuantities] = useState({});  // Nuevo estado

  useEffect(() => {
    if (categoryId) {
      setFilteredProducts(stock.filter(p => p.category === categoryId));
    } else {
      setFilteredProducts(stock);
    }
  }, [categoryId, stock]);

  const getProductQuantityInCart = (productId) => {
    const productInCart = cart.find(item => item.id === productId);
    return productInCart ? productInCart.quantity : 0;
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {filteredProducts.map(product => {
          const productQtyInCart = getProductQuantityInCart(product.id);
          const availableStock = product.stock - productQtyInCart;
          const productQuantity = productQuantities[product.id] || 1;

          return (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-img-container">
                  <img src={product.img} alt={product.name} className="card-img-top"/>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p>Stock: {availableStock}</p>

                  {/* Selector de cantidad */}
                  <p>Cantidad: 
                    <button 
                      onClick={() => setProductQuantities({ ...productQuantities, [product.id]: Math.max(1, productQuantity - 1)})}
                      disabled={productQuantity === 1}
                    >
                      -
                    </button>
                    {` ${productQuantity} `}
                    <button 
                      onClick={() => setProductQuantities({ ...productQuantities, [product.id]: Math.min(availableStock, productQuantity + 1)})}
                      disabled={productQuantity === availableStock}
                    >
                      +
                    </button>
                  </p>

                  <Link to={`/item/${product.id}`} className="btn btn-primary mr-2">Ver detalles</Link>
                  <div>
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product, productQuantity);  // Usando productQuantity
                            setProductQuantities({ ...productQuantities, [product.id]: 1 }); // Resetear a 1 después de agregar
                        }} 
                        disabled={!product.stock || productQtyInCart >= product.stock}
                        className="btn btn-success"
                      >
                        Agregar al carrito
                      </button>

                    <button 
                      onClick={(e) => {
                          e.stopPropagation();
                          removeFromCart(product, 1);
                      }} 
                      disabled={!productQtyInCart}
                      className="btn btn-danger"
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ItemListContainer;