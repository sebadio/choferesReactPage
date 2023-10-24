import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../components/UserProvider/UserProvider";
import { CartItem } from "../../interfaces";
import "./Cart.css";

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
      <p style={{ float: "left" }}>Total: ${total}</p>
      <ul id="cartList">
        {cart.map((item: CartItem) => {
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
        })}
      </ul>
    </main>
  );
};

export default Cart;
