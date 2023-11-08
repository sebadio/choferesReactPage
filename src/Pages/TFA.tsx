import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../components";
import { useContext } from "react";

export const TFA = () => {
  const { BASE_URL, setTfa, setUsername, setLoggedIn } =
    useContext(UserContext);
  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userDataEncoded = params.get("ud") as string;
  const jsonDecoded = atob(userDataEncoded);

  const userData = JSON.parse(jsonDecoded);

  const auth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { elements } = e.currentTarget;

    const tfaInput = elements.namedItem("tfa") as HTMLInputElement;
    const isTfaInput = tfaInput instanceof HTMLInputElement;

    if (!isTfaInput || tfaInput == null) return;

    const tfa = tfaInput.value;

    const { username, token } = userData;

    const body = JSON.stringify({ username, token: tfa });

    const res = await fetch(`${BASE_URL}/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const data = await res.json();

    if (res.status === 401 || res.status === 409) {
      alert(data.message);
      return;
    }

    if (data.ok) {
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      setLoggedIn(true);
      setTfa(true);
      setUsername(username);
      navigate("/userProfile");
    }
  };

  return (
    <main className="container">
      <h1 style={{ textAlign: "center" }}>2 Factor Authentication</h1>

      <form
        onSubmit={(e) => {
          auth(e);
        }}
      >
        <label htmlFor="tfa">
          2FA Code:
          <input
            style={{
              textAlign: "center",
              fontSize: "2rem",
            }}
            type="text"
            name="tfa"
            id="tfa"
            autoComplete="off"
            spellCheck="false"
            pattern="[0-9]{6,}"
            required
          />
        </label>

        <button type="submit">Authenticate</button>
      </form>
    </main>
  );
};
