import { CredentialResponse } from "@react-oauth/google";

export const useGoogleDecode = () => {
  const decodeGoogleResponse = (credential: CredentialResponse) => {
    const respuesta = credential.credential as string;
    const base64Url = respuesta.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  };

  return { decodeGoogleResponse };
};
