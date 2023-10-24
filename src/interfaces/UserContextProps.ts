import { CartItem, ChoferInterface } from "./";

export interface UserContextProps {
  cart: CartItem[];
  choferes: ChoferInterface[];
  handleAddToCart: (chofer: ChoferInterface) => void;
  handleSubtractQuantity: (chofer: ChoferInterface) => void;
  setChoferes: (choferes: ChoferInterface[]) => void;
  setToken: (token: string) => void;
  token: string;
  username: string;
}
