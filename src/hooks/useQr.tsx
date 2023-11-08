import React, { useContext, useState } from "react";
import { UserContext } from "../components/";

export const useQr = () => {
  const { username, BASE_URL, setTfa } = useContext(UserContext);

  const [qrcode, setQrcode] = useState<string>("");

  const handleRequestQr = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { elements } = e.currentTarget;

    const usernameElement = elements.namedItem("username") as HTMLInputElement;
    const usernameIsInput = usernameElement instanceof HTMLInputElement;
    const passwordElement = elements.namedItem("password") as HTMLInputElement;
    const passwordIsInput = passwordElement instanceof HTMLInputElement;

    if (!usernameIsInput || usernameElement == null) return;
    if (!passwordIsInput || passwordElement == null) return;

    const response = await fetch(`${BASE_URL}/requestQr`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameElement.value,
        password: passwordElement.value,
      }),
    });

    if (!response.ok) return;

    const data = await response.json();

    if (response.status === 401 || response.status === 409) {
      alert(data.message);
      return;
    }

    setQrcode(data.qr);
  };

  const handleVerifyQr = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { elements } = e.currentTarget;

    const qrCodeInputElement = elements.namedItem(
      "qrCodeInput"
    ) as HTMLInputElement;
    const qrCodeInputIsInput = qrCodeInputElement instanceof HTMLInputElement;

    if (!qrCodeInputIsInput || qrCodeInputElement == null) return;

    const response = await fetch(`${BASE_URL}/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: qrCodeInputElement.value,
        username,
      }),
    });
    if (!response.ok) return;

    const { ok } = await response.json();

    if (!ok) return;

    setTfa(true);
  };

  const handleDisableTfa = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { elements } = e.currentTarget;

    const passwordElement = elements.namedItem("password") as HTMLInputElement;
    const passwordIsInput = passwordElement instanceof HTMLInputElement;

    if (!passwordIsInput || passwordElement == null) return;

    const response = await fetch(`${BASE_URL}/disableTFA`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password: passwordElement.value,
      }),
    });

    if (!response.ok) return;

    const data = await response.json();

    if (response.status === 401 || response.status === 409) {
      alert(data.message);
      return;
    }

    if (data.ok) return;

    setTfa(false);
    setQrcode("");
  };

  return { handleDisableTfa, qrcode, handleRequestQr, handleVerifyQr };
};
