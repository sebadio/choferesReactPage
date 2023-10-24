import { ChoferInterface } from "../../interfaces";
import cartIcon from "../../assets/cart.svg";
import { UserContext } from "../UserProvider/UserProvider";
import { useContext } from "react";

const ChoferItem = ({ Chofer }: { Chofer: ChoferInterface }) => {
  const { handleAddToCart } = useContext(UserContext);
  const { id, image, name, price } = Chofer;
  return (
    <article key={id}>
      <img width={116} height={116} src={image} alt="" />
      <header>
        <h2>{name}</h2>
        <p>${price}</p>
      </header>

      <button
        onClick={() => {
          handleAddToCart(Chofer);
        }}
      >
        <img src={cartIcon} />
      </button>
    </article>
  );
};

export default ChoferItem;
