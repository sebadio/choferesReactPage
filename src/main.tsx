import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import {
  Cart,
  Error404,
  FinishRegister,
  Login,
  Register,
  Root,
  TFA,
  UserProfile,
} from "./Pages";
import { UserProvider, Navbar } from "./components";
import { RouteInterface } from "./interfaces";

import "./index.css";
import App from "./App";

const routes: RouteInterface[] = [
  { path: "/", element: <Root />, name: "Home" },
  { path: "/cart", element: <Cart />, name: "Cart" },
  { path: "/login", element: <Login />, name: "Login" },
  { path: "/register", element: <Register />, name: "Register" },
  { path: "/userProfile", element: <UserProfile />, name: "Profile" },
  { path: "/tfa", element: <TFA />, name: "2FA" },
  {
    path: "/finishRegistration",
    element: <FinishRegister />,
    name: "Finish Registration}",
  },
  { path: "*", element: <Error404 />, name: "404" },
];

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <App routes={routes} />
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);
