import { useState, ReactNode } from "react";
import { ChoferInterface } from "../../interfaces";
import { useCart } from "../../hooks/useCart";

import { createContext } from "react";
import { UserContextProps } from "../../interfaces";

export const UserContext = createContext<UserContextProps>({
  BASE_URL: "",
  cart: [],
  choferes: [],
  handleAddToCart: () => {},
  handleSubtractQuantity: () => {},
  loading: true,
  loggedIn: false,
  setChoferes: () => {},
  setLoggedIn: () => {},
  setTfa: () => {},
  setToken: () => {},
  setUsername: () => {},
  tfa: false,
  token: "",
  username: "",
  setLoading: () => {},
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { cart, handleAddToCart, handleSubtractQuantity } = useCart();
  const [choferes, setChoferes] = useState<ChoferInterface[]>([]);
  const [token, setToken] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [tfa, setTfa] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <UserContext.Provider
      value={{
        BASE_URL: "https://tienda-obli.sebasdiaz.com",
        cart,
        choferes,
        handleAddToCart,
        handleSubtractQuantity,
        loading,
        loggedIn,
        setChoferes,
        setLoading,
        setLoggedIn,
        setTfa,
        setToken,
        setUsername,
        tfa,
        token,
        username,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
