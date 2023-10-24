import { useState, ReactNode } from "react";
import { ChoferInterface } from "../../interfaces";
import { useCart } from "../../hooks/useCart";

import { createContext } from "react";
import { UserContextProps } from "../../interfaces";

export const UserContext = createContext<UserContextProps>({
  choferes: [],
  cart: [],
  username: "",
  handleAddToCart: () => {},
  handleSubtractQuantity: () => {},
  setChoferes: () => {},
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { cart, handleAddToCart, handleSubtractQuantity } = useCart();
  const [choferes, setChoferes] = useState<ChoferInterface[]>([]);

  return (
    <UserContext.Provider
      value={{
        choferes,
        username: "",
        cart,
        handleAddToCart,
        handleSubtractQuantity,
        setChoferes,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
