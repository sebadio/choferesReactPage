import { ChoferInterface } from "../../interfaces";
import cartIcon from "../../assets/cart.svg";
import { UserContext } from "../";
import { useContext } from "react";

const ChoferItem = ({ Chofer }: { Chofer: ChoferInterface }) => {
  const { handleAddToCart } = useContext(UserContext);
  const { id, image, name, price } = Chofer;
  return (
    <article key={id}>
      <img
        width={100}
        height={100}
        src={image}
        alt={name + " image"}
        style={{
          backgroundColor: "white",
          width: "100px",
          height: "100px",
          aspectRatio: "1/1",
        }}
      />
      <header>
        <h2>{name}</h2>
        <p>${price}</p>
      </header>

      <button
        aria-label="Add to cart"
        onClick={() => {
          handleAddToCart(Chofer);
        }}
      >
        <img alt="add to cart image" src={cartIcon} />
      </button>
    </article>
  );
};

export default ChoferItem;
