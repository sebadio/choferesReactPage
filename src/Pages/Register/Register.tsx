import { useContext } from "react";
import { UserContext } from "../../components";
import { useUserAuth } from "../../hooks";
import "./Register.css";

const Register = () => {
  const { loggedIn } = useContext(UserContext);
  const { register } = useUserAuth();

  return (
    <main>
      {loggedIn ? (
        <h1>You're already logged in</h1>
      ) : (
        <>
          <h1>Register</h1>
          <form onSubmit={register}>
            <label htmlFor="username">Username</label>
            <input
              name="username"
              type="username"
              id="username"
              minLength={2}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              id="password"
              pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[_#@$+*.,<>!¡¿?]).{8,30}$"
              minLength={8}
              required
            />

            <button type="submit">Register</button>
          </form>
        </>
      )}
    </main>
  );
};

export default Register;
