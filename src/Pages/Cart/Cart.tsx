import { useState, useEffect, useContext } from "react";
import { CartItemInterface } from "../../interfaces";
import { UserContext, CartForm, CartItem } from "../../components/";
import "./Cart.css";

const Cart = () => {
  const [total, setTotal] = useState(0);

  const { cart, handleAddToCart, handleSubtractQuantity } =
    useContext(UserContext);

  useEffect(() => {}, []);

  useEffect(() => {
    let total: number = 0;
    cart.forEach((item: CartItemInterface) => {
      total += parseInt(item.Chofer.price) * item.quantity;
    });
    setTotal(total);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <main>
      <h1>Cart</h1>
      <p style={{ float: "left" }}>Total: ${total}</p>
      <div className="cartContainer">
        <ul id="cartList">
          {cart.map((item: CartItemInterface) => {
            return (
              <CartItem
                handleAddToCart={handleAddToCart}
                handleSubtractQuantity={handleSubtractQuantity}
                item={item}
                key={item.Chofer.id}
              />
            );
          })}
        </ul>
        <CartForm />
      </div>
    </main>
  );
};

export default Cart;
