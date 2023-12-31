import { CredentialResponse } from "@react-oauth/google";
import { useContext } from "react";
import { useGoogleDecode } from ".";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components";

export const useUserAuth = () => {
  const navigate = useNavigate();

  const {
    BASE_URL,
    loggedIn,
    setLoading,
    setLoggedIn,
    setTfa,
    setToken,
    setUsername,
    token,
    username,
    setCart,
  } = useContext(UserContext);

  const { decodeGoogleResponse } = useGoogleDecode();

  const checkUserToken = async () => {
    if (!username && !token && !loggedIn) {
      if (localStorage.getItem("username") && localStorage.getItem("token")) {
        const storedUsername = localStorage.getItem("username") as string;
        const storedToken = localStorage.getItem("token") as string;
        const res = await fetch(BASE_URL + "/checkToken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: storedUsername,
            token: storedToken,
          }),
        });

        const data = await res.json();

        if (data.ok) {
          setTfa(data.tfa.tfa);
          setLoggedIn(true);
          setUsername(storedUsername);
          setToken(storedToken);
        } else {
          setLoggedIn(false);
          setUsername("");
          setToken("");
        }
      }
    }
    setLoading(false);
  };

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    const { username, password, error } = retrieveUserInfo(e);

    if (error) return;

    try {
      const res = await fetch(`${BASE_URL}/register`, {
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

      const { token, ok } = data;

      if (!ok) throw new Error("Error al registrar usuario");

      if (data.ok) {
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);

        setLoggedIn(true);
        setUsername(username);
        setToken(token);
        navigate("/userProfile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const retrieveUserInfo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { elements } = event.currentTarget;

    const usernameInput = elements.namedItem("username") as HTMLInputElement;
    const isUsernameInput = usernameInput instanceof HTMLInputElement;

    if (!isUsernameInput || usernameInput == null)
      return { username: "", password: "", error: true };

    const passwordInput = elements.namedItem("password") as HTMLInputElement;
    const isPasswordInput = passwordInput instanceof HTMLInputElement;

    if (!isPasswordInput || passwordInput == null)
      return { username: "", password: "", error: true };

    const username = usernameInput.value;
    const password = passwordInput.value;

    return { username, password, error: false };
  };

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    const { username, password, error } = retrieveUserInfo(e);

    if (error) return console.log({ error });

    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.status === 401 || res.status === 400) {
        alert(data.message);
        return;
      }

      console.log({ data });

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.ok && data.tfa) {
        navigate(
          `/tfa?ud=${btoa(JSON.stringify({ username, token: data.token }))}`
        );
      } else if (data.ok && !data.tfa) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username);
        setLoggedIn(true);
        setTfa(data.tfa);
        setUsername(username);
        navigate("/userProfile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    setCart([]);
    setLoggedIn(false);
    setUsername("");
    setToken("");
    navigate("/");
  };

  const googleLogin = async (credentialResponse: CredentialResponse) => {
    const { email } = decodeGoogleResponse(credentialResponse);
    const res = await fetch(`${BASE_URL}/googleLogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: email }),
    });

    const data = await res.json();

    if (!data.ok) return;

    if (data.tfa) {
      navigate(
        `/tfa?ud=${btoa(
          JSON.stringify({ username: email, token: data.token })
        )}`
      );
    } else {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", email);
      setLoggedIn(true);
      setTfa(data.tfa);
      setUsername(email);
      navigate("/userProfile");
    }
  };

  return {
    checkUserToken,
    decodeGoogleResponse,
    googleLogin,
    login,
    logout,
    register,
  };
};
