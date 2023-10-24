import { CartItem, ChoferInterface } from "./";

export interface UserContextProps {
  choferes: ChoferInterface[];
  cart: CartItem[];
  handleAddToCart: (chofer: ChoferInterface) => void;
  handleSubtractQuantity: (chofer: ChoferInterface) => void;
  setChoferes: (choferes: ChoferInterface[]) => void;
  username: string;
}
