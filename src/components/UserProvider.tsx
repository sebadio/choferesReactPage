import { ChoferInterface, UserContextProps } from "../interfaces";
import { useCart } from "../hooks";
import { useState, ReactNode, createContext } from "react";

export const UserContext = createContext<UserContextProps>({
  BASE_URL: "",
  cart: [],
  choferes: [],
  handleAddToCart: () => {},
  handleSubtractQuantity: () => {},
  loading: true,
  loggedIn: false,
  setCart: () => {},
  setChoferes: () => {},
  setLoading: () => {},
  setLoggedIn: () => {},
  setTfa: () => {},
  setToken: () => {},
  setUsername: () => {},
  tfa: false,
  token: "",
  username: "",
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [choferes, setChoferes] = useState<ChoferInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [tfa, setTfa] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const { cart, handleAddToCart, handleSubtractQuantity, setCart } = useCart();

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
        setCart,
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
