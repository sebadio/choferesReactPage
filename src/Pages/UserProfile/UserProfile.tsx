import { useContext, useEffect } from "react";
import { UserContext } from "../../components";
import { useQr, useUserAuth } from "../../hooks";

const UserProfile = () => {
  const { username, tfa, loggedIn } = useContext(UserContext);
  const { handleRequestQr, handleVerifyQr, qrcode, handleDisableTfa } = useQr();
  const { logout } = useUserAuth();

  useEffect(() => {
    if (!username || !loggedIn) {
      window.location.href = "/login";
    }
  }, [loggedIn, username]);

  return (
    <main>
      <h1>{username}'s Profile</h1>

      {tfa ? (
        <>
          <p>2FA is enabled</p>

          <form onSubmit={handleDisableTfa}>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />

            <button type="submit">Disable 2FA</button>
          </form>
        </>
      ) : (
        <div>
          {qrcode === "" ? (
            <>
              <div>Setup 2FA</div>

              <form onSubmit={handleRequestQr}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
                <button type="submit">Request QR</button>
              </form>
            </>
          ) : (
            <>
              <img
                style={{ borderRadius: "1rem" }}
                src={qrcode}
                alt="QR Code"
                width={300}
                height={300}
              />
              <p>Scan the QR code with your authenticator app</p>

              <form onSubmit={handleVerifyQr}>
                <input
                  style={{
                    padding: "1rem",
                    borderRadius: "1rem",
                    border: "1px solid white",
                    textAlign: "center",
                    fontSize: "2rem",
                  }}
                  type="text"
                  name="qrCodeInput"
                  id="qrCodeInput"
                  pattern="[0-9]{6}"
                />

                <button type="submit">Submit</button>
              </form>
            </>
          )}
        </div>
      )}

      <button onClick={logout}>Log Out</button>
    </main>
  );
};

export default UserProfile;
