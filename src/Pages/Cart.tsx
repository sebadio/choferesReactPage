import { useState, useEffect, useContext } from "react";
import { CartItemInterface } from "../interfaces";
import { UserContext, CartForm, CartItem } from "../components";

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
  }, [cart]);

  return (
    <main className="container">
      <h1 style={{ textAlign: "center" }}>Cart</h1>
      <div className="grid">
        <div>
          <p style={{ textAlign: "center" }}>Total: ${total}</p>

          <ul className="cartList">
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
        </div>
        <CartForm />
      </div>
    </main>
  );
};

export default Cart;
