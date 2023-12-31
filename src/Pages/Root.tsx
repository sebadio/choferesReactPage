import { useContext, useState } from "react";
import { ChoferInterface } from "../interfaces";
import { ChoferItem, UserContext, ChoferItemPlaceholder } from "../components";

function Root() {
  const { choferes, setChoferes, BASE_URL } = useContext(UserContext);
  const [error, setError] = useState<string | null>(null);

  const handleChoferes = async () => {
    try {
      const res = await fetch(`${BASE_URL}/choferes`);
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

  if (choferes.length === 0 && !error) {
    handleChoferes();
  }

  return (
    <main>
      <h1 style={{ textAlign: "center" }}>Tienda</h1>

      {error ? (
        <p style={{ textAlign: "center" }}>{error}</p>
      ) : (
        <section className="choferes-grid">
          {choferes.length === 0
            ? Array.from({ length: 20 }).map((_, index) => {
                return <ChoferItemPlaceholder key={index} />;
              })
            : choferes.map((currentChofer: ChoferInterface) => {
                return (
                  <ChoferItem key={currentChofer.id} Chofer={currentChofer} />
                );
              })}
        </section>
      )}
    </main>
  );
}

export default Root;
