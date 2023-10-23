import { useEffect, useReducer, useState } from "react";
import "./App.css";
import cartIcon from "../../assets/cart.svg";

interface Chofer {
  id: number;
  image: string;
  name: string;
  price: string;
}

interface CartItem {
  Chofer: Chofer;
  quantity: number;
}

function App() {
  const [choferes, setChoferes] = useState([] as Chofer[]);
  const [cart, setCart] = useState([] as CartItem[]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    getChoferes();
  }, []);

  useReducer;

  useEffect(() => {
    let total: number = 0;
    cart.forEach((item) => {
      total += parseInt(item.Chofer.price) * item.quantity;
    });
    setTotal(total);
  }, [cart]);

  const getChoferes = async () => {
    try {
      const res = await fetch("https://tienda-obli.sebasdiaz.com/choferes");
      const data: Chofer[] = await res.json();

      setChoferes(data);
    } catch (error) {
      console.log(error);
      setError("Error al cargar los choferes");
    }
  };

  return (
    <main>
      <h1>Tienda</h1>

      {
        <div>
          <h2>Carrito</h2>
          <p>Total: ${total}</p>
        </div>
      }

      {cart.map((item) => {
        return (
          <div>
            <h2>{item.Chofer.name}</h2>
            <p>{item.quantity}</p>
          </div>
        );
      })}

      {choferes.length === 0 ? (
        <p>{error || "Cargando..."}</p>
      ) : (
        <section>
          {choferes.map((Chofer) => {
            return (
              <article key={Chofer.id}>
                <img src={Chofer.image} alt="" />
                <header>
                  <h2>{Chofer.name}</h2>
                  <p>${Chofer.price}</p>
                </header>

                <button
                  onClick={() => {
                    console.log(cart);

                    if (cart.some((item) => item.Chofer.id === Chofer.id)) {
                      const newCart = cart.map((item) => {
                        if (item.Chofer.id === Chofer.id) {
                          item.quantity += 1;
                        }
                        return item;
                      });
                      setCart(newCart);
                    } else {
                      setCart([...cart, { Chofer, quantity: 1 }]);
                    }
                  }}
                >
                  <img src={cartIcon} />
                </button>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}

export default App;
