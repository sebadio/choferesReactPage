import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Cart, Login, Register, Root } from "./Pages";
import { UserProvider, Navbar } from "./components";

import "./index.css";
import App from "./App";

const routes = [
  { path: "/", element: <Root />, name: "Home" },
  { path: "/cart", element: <Cart />, name: "Cart" },
  { path: "/login", element: <Login />, name: "Login" },
  { path: "/register", element: <Register />, name: "Register" },
];

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Navbar routes={routes} />
        <App routes={routes} />
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);
