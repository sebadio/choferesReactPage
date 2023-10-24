import { useState, useEffect, useContext } from "react";
import { CartItem } from "../../interfaces";
import { UserContext } from "../../components/UserProvider/UserProvider";

const Cart = () => {
  const [total, setTotal] = useState(0);

  const { cart, handleAddToCart, handleSubtractQuantity } =
    useContext(UserContext);

  useEffect(() => {
    let total: number = 0;
    cart.forEach((item: CartItem) => {
      total += parseInt(item.Chofer.price) * item.quantity;
    });
    setTotal(total);
  }, [cart]);

  return (
    <main>
      <h1>Cart</h1>

      {
        <div>
          <h2>Carrito</h2>
          <p>Total: ${total}</p>
        </div>
      }

      {cart.map((item: CartItem) => {
        return (
          <li key={item.Chofer.id}>
            {item.Chofer.name}
            <p>${item.Chofer.price}</p>
            <p>{item.quantity}</p>

            <button
              onClick={() => {
                handleSubtractQuantity(item.Chofer);
              }}
            >
              -
            </button>
            <button
              onClick={() => {
                handleAddToCart(item.Chofer);
              }}
            >
              +
            </button>
          </li>
        );
      })}
    </main>
  );
};

export default Cart;
