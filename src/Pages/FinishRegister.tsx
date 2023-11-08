import { useEffect, useContext } from "react";
import { UserContext } from "../components";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserAuth } from "../hooks";

export const FinishRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { register } = useUserAuth();
  const { loggedIn } = useContext(UserContext);

  const params = new URLSearchParams(location.search);
  const userDataString = params.get("ud") as string;
  const userData = JSON.parse(userDataString);

  const { email } = userData;

  console.log(userData);

  useEffect(() => {
    if (loggedIn) {
      navigate("/userProfile");
    }
  }, [loggedIn]);

  return (
    <main className="container">
      <h1 style={{ textAlign: "center" }}>Finish up your account</h1>

      <form onSubmit={register}>
        <label htmlFor="username">
          Username
          <input
            type="text"
            name="username"
            id="username"
            value={email}
            disabled
          />
        </label>

        <label htmlFor="password">
          Password
          <input type="password" name="password" id="password" />
        </label>

        <button type="submit">Finish up</button>
      </form>
    </main>
  );
};
