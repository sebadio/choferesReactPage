import { ChoferInterface } from "../../interfaces";
import cartIcon from "../../assets/cart.svg";
import { UserContext } from "../";
import { useContext } from "react";

const ChoferItemPlaceholder = () => {
  return (
    <article className="choferPlaceholder">
      <div
        style={{
          backgroundColor: "rgba(255,255,255,0.5)",
          width: "100px",
          height: "100px",
          aspectRatio: "1/1",
          borderRadius: "50%",
        }}
      ></div>
      <header className="header">
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.5)",
            width: "6rem",
            height: "1rem",
          }}
        ></div>
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.5)",
            width: "6rem",
            height: "1rem",
          }}
        ></div>
      </header>
      <div className="button"></div>
    </article>
  );
};

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
          backgroundColor: "rgba(255,255,255,0.5)",
          width: "100px",
          height: "100px",
          aspectRatio: "1/1",
        }}
      />
      <header>
        <h3>{name}</h3>
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

export { ChoferItem, ChoferItemPlaceholder };
