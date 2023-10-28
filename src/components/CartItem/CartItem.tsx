import { CartItemInterface, ChoferInterface } from "../../interfaces";

export const CartItem = ({
  item,
  handleAddToCart,
  handleSubtractQuantity,
}: {
  item: CartItemInterface;
  handleAddToCart: (Chofer: ChoferInterface) => void;
  handleSubtractQuantity: (Chofer: ChoferInterface) => void;
}) => {
  return (
    <li key={item.Chofer.id}>
      <span>
        <strong>{item.Chofer.name}</strong> ~ {item.Chofer.price} x{" "}
        {item.quantity}
      </span>

      <div>
        <button
          id="addBtn"
          onClick={() => {
            handleAddToCart(item.Chofer);
          }}
        >
          +
        </button>
        <button
          id="subtractBtn"
          onClick={() => {
            handleSubtractQuantity(item.Chofer);
          }}
        >
          -
        </button>
      </div>
    </li>
  );
};
