import { useContext } from "react";
import { UserContext } from ".";
import { CartItemInterface } from "../interfaces";

interface CartFormProps {
  order_content: CartItemInterface[];
  address_content: {
    address: string;
    city: string;
    email: string;
    name: string;
  };
}

export const CartForm = () => {
  const { cart } = useContext(UserContext);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

    console.log(order);
    handleSendData(order);
  };

  const handleSendData = async (order: CartFormProps) => {
    const response = await fetch("http://tienda-obli.sebasdiaz.com/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    const data = await response.json();

    if (data.ok) {
      alert("Order sent successfully");
    } else {
      alert("Error sending order");
    }

    console.log(data);
  };

  return (
    <form className="container" onSubmit={handleFormSubmit}>
      <label htmlFor="name">
        Name
        <input type="text" name="name" id="name" />
      </label>

      <label htmlFor="email">
        Email
        <input type="email" name="email" id="email" />
      </label>

      <label htmlFor="address">
        Address
        <input type="text" name="address" id="address" />
      </label>

      <label htmlFor="city">
        City
        <input type="text" name="city" id="city" />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};
