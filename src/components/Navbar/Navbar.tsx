import { Link } from "react-router-dom";
import { RoutesInterface } from "../../interfaces";
import "./Navbar.css";
const Navbar = ({ routes }: { routes: RoutesInterface[] }) => {
  return (
    <nav>
      <ul>
        {routes.map((route) => {
          return (
            <li key={route.path}>
              <Link to={route.path}>{route.name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
