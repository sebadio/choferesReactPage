import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from ".";

const Placeholder = () => {
  return <li className="placeholder"></li>;
};

const Navbar = () => {
  const { loggedIn, username, loading } = useContext(UserContext);

  if (loading) {
    return (
      <nav style={{ padding: " 0 1rem", justifyContent: "center" }}>
        <ul>
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </ul>
      </nav>
    );
  } else {
    return (
      <nav style={{ padding: " 0 1rem", justifyContent: "center" }}>
        <ul style={{ gap: "2rem" }}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          {loggedIn ? (
            <li>
              <Link style={{ textTransform: "capitalize" }} to="/userProfile">
                {username} Profile
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    );
  }
};

export default Navbar;
