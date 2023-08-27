import React from 'react';
import { useCart } from '../contexts/CartContext';

function CartIcon() {
  const { quantity } = useCart();

  return (
    <div>
      🛒 {quantity}
    </div>
  );
}

export default CartIcon;