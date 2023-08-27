import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

function ItemDetailContainer() {
  const { itemId } = useParams();
  const { addToCart, cart, stock } = useCart();
  
  // Buscar el producto en el stock del contexto en lugar de los datos importados directamente.
  const item = stock.find(p => p.id === parseInt(itemId, 10));
  
  const [quantity, setQuantity] = useState(1);

  const getProductQuantityInCart = (productId) => {
    const productInCart = cart.find(item => item.id === productId);
    return productInCart ? productInCart.quantity : 0;
  };

  const productQtyInCart = getProductQuantityInCart(item.id);
  const availableStock = item.stock - productQtyInCart;

  // Actualizar el valor de quantity si el stock disponible cambia y es menor que la cantidad seleccionada.
  useEffect(() => {
    if (availableStock < quantity) {
      setQuantity(availableStock);
    }
  }, [availableStock, quantity]);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <img src={item.img} alt={item.name} className="img-fluid"/>
        </div>
        <div className="col-md-6">
          <h1>{item.name}</h1>
          <p>{item.detail}</p>
          <p>Stock disponible: {availableStock}</p>
          
          <p>Cantidad: 
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity === 1}
            >
              -
            </button>
            {` ${quantity} `}
            <button 
              onClick={() => setQuantity(Math.min(availableStock, quantity + 1))}
              disabled={quantity === availableStock}
            >
              +
            </button>
          </p>

          <button 
            className="btn btn-primary" 
            onClick={() => addToCart(item, quantity)}
            disabled={availableStock === 0}
        >
            Agregar al carrito
        </button>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailContainer;