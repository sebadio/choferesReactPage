import { useState } from "react";
import { CartItem, ChoferInterface } from "../interfaces";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (chofer: ChoferInterface) => {
    if (cart.some((item) => item.Chofer.id === chofer.id)) {
      const newCart = cart.map((item) => {
        if (item.Chofer.id === chofer.id) {
          item.quantity += 1;
        }
        return item;
      });
      setCart(newCart);
    } else {
      setCart([...cart, { Chofer: chofer, quantity: 1 }]);
    }
  };

  const handleSubtractQuantity = (chofer: ChoferInterface) => {
    const newCart: CartItem[] = cart.map((item: CartItem) => {
      if (item.Chofer.id === chofer.id) {
        item.quantity -= 1;
      }

      return item;
    });

    setCart(newCart.filter((item: CartItem) => item.quantity > 0));
  };

  return {
    cart,
    handleAddToCart,
    handleSubtractQuantity,
  };
};
