import { useState } from "react";
import "./Login.css";

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const retrieveUserInfo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { elements } = event.currentTarget;

    const usernameInput = elements.namedItem("email") as HTMLInputElement;
    const isUsernameInput = usernameInput instanceof HTMLInputElement;
    if (!isUsernameInput || usernameInput == null) return;

    const passwordInput = elements.namedItem("password") as HTMLInputElement;
    const isPasswordInput = passwordInput instanceof HTMLInputElement;
    if (!isPasswordInput || passwordInput == null) return;

    const username = usernameInput.value;
    const password = passwordInput.value;

    login(username, password);
  };

  const login = async (username: string, password: string) => {
    try {
      const res = await fetch("https://tienda-obli.sebasdiaz.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.ok) {
        setLoggedIn(true);
      }

      //   localStorage.setItem("token", data.token);
      //   localStorage.setItem("username", data.username);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      {loggedIn ? (
        <p>You're already logged in</p>
      ) : (
        <>
          <h1>Login</h1>
          <form onSubmit={retrieveUserInfo}>
            <label htmlFor="username">Username</label>
            <input name="username" type="username" id="username" />

            <label htmlFor="password">Password</label>
            <input name="password" type="password" id="password" />

            <button type="submit">Ingresar</button>
          </form>
        </>
      )}
    </main>
  );
};

export default Login;
