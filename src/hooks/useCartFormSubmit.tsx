import { CartFormProps } from "../interfaces";
import { useContext } from "react";
import { UserContext } from "../components";

export const useCartFormSubmit = () => {
  const { setCart, cart, loggedIn, BASE_URL } = useContext(UserContext);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loggedIn) {
      alert("You must be logged in to place an order");
      return;
    }

    if (cart.length === 0) {
      alert("You must have at least one item in your cart to place an order");
      return;
    }

    console.log("form submitted");

    const { elements } = e.currentTarget;

    const nameElement = elements.namedItem("name") as HTMLInputElement;
    const nameIsInput = nameElement instanceof HTMLInputElement;
    const emailElement = elements.namedItem("email") as HTMLInputElement;
    const emailIsInput = emailElement instanceof HTMLInputElement;
    const addressElement = elements.namedItem("address") as HTMLInputElement;
    const addressIsInput = addressElement instanceof HTMLInputElement;
    const cityElement = elements.namedItem("city") as HTMLInputElement;
    const cityIsInput = cityElement instanceof HTMLInputElement;

    if (!nameIsInput || nameElement == null) return;
    if (!emailIsInput || emailElement == null) return;
    if (!addressIsInput || addressElement == null) return;
    if (!cityIsInput || cityElement == null) return;

    const name = nameElement.value;
    const email = emailElement.value;
    const address = addressElement.value;
    const city = cityElement.value;

    const order: CartFormProps = {
      address_content: {
        address,
        city,
        email,
        name,
      },
      order_content: cart,
    };

    const ok = await handleSendData(order);
    if (ok) {
      nameElement.value = "";
      emailElement.value = "";
      addressElement.value = "";
      cityElement.value = "";
    }
  };

  const handleSendData = async (order: CartFormProps) => {
    const response = await fetch(`${BASE_URL}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    const data = await response.json();

    if (data.ok) {
      setCart([]);
      localStorage.removeItem("cart");
      alert("Order sent successfully");
      return true;
    } else {
      alert("Error sending order");
      return false;
    }
  };

  return { handleFormSubmit, handleSendData };
};
