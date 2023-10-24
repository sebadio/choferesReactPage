import { useContext, useState } from "react";
import { ChoferInterface } from "../../interfaces";
import { ChoferItem, UserContext } from "../../components";
import "./Root.css";

function Root() {
  const { choferes, setChoferes } = useContext(UserContext);

  const handleChoferes = async () => {
    try {
      const res = await fetch("https://tienda-obli.sebasdiaz.com/choferes");
      const data = await res.json();

      if (!data || data.length === 0) {
        throw new Error("No hay choferes");
      }

      setChoferes(data);
    } catch (error) {
      console.error(error);
      setError("Error al cargar los choferes");
    }
  };

  const [error, setError] = useState("");

  if (choferes.length === 0 && !error) {
    handleChoferes();
  }

  return (
    <main>
      <h1>Tienda</h1>

      {choferes.length === 0 ? (
        <p>{error || "Cargando..."}</p>
      ) : (
        <section>
          {choferes.map((currentChofer: ChoferInterface) => {
            return <ChoferItem key={currentChofer.id} Chofer={currentChofer} />;
          })}
        </section>
      )}
    </main>
  );
}

export default Root;
