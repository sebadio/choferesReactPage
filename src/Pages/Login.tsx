import { useEffect, useContext } from "react";
import { UserContext } from "../components";
import { useUserAuth } from "../hooks";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loggedIn } = useContext(UserContext);
  const { login } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate("/userProfile");
    }
  }, [loggedIn]);

  return (
    <main className="container">
      {loggedIn ? (
        <h1>You're already logged in</h1>
      ) : (
        <>
          <h1 style={{ textAlign: "center" }}>Login</h1>
          <form onSubmit={login}>
            <label htmlFor="username">
              Username
              <input
                name="username"
                type="username"
                id="username"
                minLength={2}
                required
              />
            </label>

            <label htmlFor="password">
              Password
              <input
                name="password"
                type="password"
                id="password"
                pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[_#@$+*.,<>!¡¿?]).{8,30}$"
                minLength={8}
                required
              />
              <small>
                Password must contain at least 8 characters, one uppercase, one
                lowercase, one number and one special character
              </small>
            </label>

            <button type="submit">Log In</button>
          </form>
        </>
      )}
    </main>
  );
};

export default Login;
