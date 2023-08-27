import React, { createContext, useContext, useState } from 'react';
import productos from '../data/productos.json';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [stock] = useState(productos);

  const addToCart = (item, qtyToAdd) => {
    console.log("add cart", qtyToAdd);

    // Hacemos una copia del carrito actual
    const currentCart = [...cart];

    // Buscamos si el producto ya está en el carrito
    const existingProductIndex = currentCart.findIndex(cartItem => cartItem.id === item.id);

    // Si el producto ya está en el carrito, actualizamos su cantidad
    if (existingProductIndex !== -1) {
        currentCart[existingProductIndex].quantity += qtyToAdd;
    } else {
        // Si no está en el carrito, lo agregamos
        currentCart.push({ ...item, quantity: qtyToAdd });
    }

    // Actualizamos el estado del carrito con el nuevo carrito
    setCart(currentCart);
};
  
const removeFromCart = (item, qtyToRemove = 1) => {
    console.log("remove from cart", qtyToRemove);

    // Hacemos una copia del carrito actual
    const currentCart = [...cart];

    // Buscamos si el producto ya está en el carrito
    const existingProductIndex = currentCart.findIndex(cartItem => cartItem.id === item.id);

    // Si el producto está en el carrito, reducimos su cantidad o lo eliminamos
    if (existingProductIndex !== -1) {
        currentCart[existingProductIndex].quantity -= qtyToRemove;

        if (currentCart[existingProductIndex].quantity <= 0) {
            currentCart.splice(existingProductIndex, 1);
        }
    }

    // Actualizamos el estado del carrito con el nuevo carrito
    setCart(currentCart);
};


  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, stock, quantity: totalQuantity, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};