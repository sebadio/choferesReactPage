import { useEffect, useContext } from "react";
import { UserContext } from "../components";
import { useUserAuth } from "../hooks";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const Register = () => {
  const { loggedIn } = useContext(UserContext);
  const { register, decodeGoogleResponse } = useUserAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate("/userProfile");
    }
  }, [loggedIn]);

  return (
    <GoogleOAuthProvider clientId="242152960244-rsbfp2dhsrb1u8e2fumu5paq2sui2lkm.apps.googleusercontent.com">
      <main className="container">
        {loggedIn ? (
          <h1>You're already logged in</h1>
        ) : (
          <>
            <h1 style={{ textAlign: "center" }}>Register</h1>
            <form onSubmit={register}>
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

              <button type="submit">Register</button>
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
                context="signup"
                theme="filled_black"
                shape="pill"
                onSuccess={(credentialResponse) => {
                  const ud = decodeGoogleResponse(credentialResponse);
                  navigate(`/finishRegistration?ud=${JSON.stringify(ud)}`);
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

export default Register;
