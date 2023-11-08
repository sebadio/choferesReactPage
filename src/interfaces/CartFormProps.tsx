import { CartItemInterface } from "./";
export interface CartFormProps {
  order_content: CartItemInterface[];
  address_content: {
    address: string;
    city: string;
    email: string;
    name: string;
  };
}
