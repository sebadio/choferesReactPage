import { Routes, Route } from "react-router-dom";
import { RouteInterface } from "./interfaces";
import { useUserAuth } from "./hooks";
import { useEffect, useContext } from "react";
import { UserContext } from "./components";

function App({ routes }: { routes: RouteInterface[] }) {
  const { checkUserToken } = useUserAuth();
  const { setCart } = useContext(UserContext);
  useEffect(() => {
    checkUserToken();
    setCart(JSON.parse(localStorage.getItem("cart")!) || []);
  }, []);

  return (
    <Routes>
      {routes.map((route) => {
        return (
          <Route key={route.path} path={route.path} element={route.element} />
        );
      })}
    </Routes>
  );
}

export default App;
