import { useCartFormSubmit } from "../hooks/useCartFormSubmit";

export const CartForm = () => {
  const { handleFormSubmit } = useCartFormSubmit();

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
