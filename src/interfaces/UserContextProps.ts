import { CartItemInterface, ChoferInterface } from "./";

export interface UserContextProps {
  BASE_URL: string;
  cart: CartItemInterface[];
  choferes: ChoferInterface[];
  handleAddToCart: (chofer: ChoferInterface) => void;
  handleSubtractQuantity: (chofer: ChoferInterface) => void;
  loading: boolean;
  loggedIn: boolean;
  setCart: (cart: CartItemInterface[]) => void;
  setChoferes: (choferes: ChoferInterface[]) => void;
  setLoading: (loading: boolean) => void;
  setLoggedIn: (loggedIn: boolean) => void;
  setTfa: (tfa: boolean) => void;
  setToken: (token: string) => void;
  setUsername: (username: string) => void;
  tfa: boolean;
  token: string;
  username: string;
}
