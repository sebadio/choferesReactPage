import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Register, Login, App } from "./Pages";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <nav>
      <ul>
        <li>Tienda</li>
        <li>Carrito</li>
        <li>Log in</li>
        <li>Register</li>
      </ul>
    </nav>

    <RouterProvider router={router} />
  </React.StrictMode>
);
