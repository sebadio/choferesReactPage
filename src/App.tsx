import { Routes, Route } from "react-router-dom";
import { RoutesInterface } from "./interfaces";
import { useUserAuth } from "./hooks";
import { useEffect } from "react";

function App({ routes }: { routes: RoutesInterface[] }) {
  const { checkUserToken } = useUserAuth();

  useEffect(() => {
    checkUserToken();
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
