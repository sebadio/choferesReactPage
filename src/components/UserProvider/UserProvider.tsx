import { useState, ReactNode } from "react";
import { ChoferInterface } from "../../interfaces";
import { useCart } from "../../hooks/useCart";

import { createContext } from "react";
import { UserContextProps } from "../../interfaces";

export const UserContext = createContext<UserContextProps>({
  cart: [],
  choferes: [],
  handleAddToCart: () => {},
  handleSubtractQuantity: () => {},
  setChoferes: () => {},
  setToken: () => {},
  token: "",
  username: "",
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { cart, handleAddToCart, handleSubtractQuantity } = useCart();
  const [choferes, setChoferes] = useState<ChoferInterface[]>([]);
  const [token, setToken] = useState<string>("");

  return (
    <UserContext.Provider
      value={{
        cart,
        choferes,
        handleAddToCart,
        handleSubtractQuantity,
        setChoferes,
        setToken,
        token,
        username: "",
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
