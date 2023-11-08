import { useEffect, useContext } from "react";
import { UserContext } from "../components";
import { useUserAuth } from "../hooks";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const { loggedIn } = useContext(UserContext);
  const { login, googleLogin } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate("/userProfile");
    }
  }, [loggedIn]);

  //TODO: check pattern for password

  return (
    <GoogleOAuthProvider clientId="242152960244-rsbfp2dhsrb1u8e2fumu5paq2sui2lkm.apps.googleusercontent.com">
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
                  Password must contain at least 8 characters, one uppercase,
                  one lowercase, one number and one special character
                </small>
              </label>

              <button type="submit">Log In</button>
            </form>

            <hr />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <GoogleLogin
                locale="en"
                context="signin"
                theme="filled_black"
                shape="pill"
                onSuccess={(credentialResponse) => {
                  googleLogin(credentialResponse);
                }}
                onError={() => {
                  console.log("error");
                }}
                useOneTap
              />
            </div>
          </>
        )}
      </main>
    </GoogleOAuthProvider>
  );
};

export default Login;
