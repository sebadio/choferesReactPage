import { Routes, Route } from "react-router-dom";
import { RoutesInterface } from "./interfaces";
function App({ routes }: { routes: RoutesInterface[] }) {
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
