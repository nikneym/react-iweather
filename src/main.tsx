import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import IndexPage from "./routes/page.tsx";
import CityPage from "./routes/city/page.tsx";

import "./global.css";

const router = createBrowserRouter([
  /* index */
  {
    path: "/",
    element: <IndexPage />,
  },
  /* view a weather forecast of a city by given id where id is an unsigned integer */
  {
    path: "/city/:id",
    element: <CityPage />,
  },
  /* 404 and other error cases */
  {
    path: "*",
    element: <>TODO</>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
