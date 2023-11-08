import { ChoferInterface } from "../interfaces";
import cartIcon from "../assets/cart.svg";
import { UserContext } from ".";
import { useContext } from "react";

const ChoferItemPlaceholder = () => {
  return (
    <article className="choferPlaceholder">
      <header className="header">
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.5)",
            width: "128px",
            height: "128px",
            aspectRatio: "1/1",
            borderRadius: "50%",
          }}
        />
      </header>

      <progress></progress>
      <progress></progress>

      <footer>
        <button aria-label="Add to cart">
          <img alt="add to cart image" src={cartIcon} />
        </button>
      </footer>
    </article>
  );
};

const ChoferItem = ({ Chofer }: { Chofer: ChoferInterface }) => {
  const { handleAddToCart } = useContext(UserContext);
  const { id, image, name, price } = Chofer;

  return (
    <article key={id}>
      <header>
        <img
          width={100}
          height={100}
          src={image}
          alt={name + " image"}
          style={{
            backgroundColor: "rgba(255,255,255,0.5)",
            aspectRatio: "1/1",
          }}
        />
      </header>

      <h2>{name}</h2>
      <p>${price}</p>

      <footer>
        <button
          aria-label="Add to cart"
          onClick={() => {
            handleAddToCart(Chofer);
          }}
        >
          <img width={18} height={16} alt="add to cart image" src={cartIcon} />
        </button>
      </footer>
    </article>
  );
};

export { ChoferItem, ChoferItemPlaceholder };
