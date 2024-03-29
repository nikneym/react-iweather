import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import IndexPage from "./routes/page.tsx";
import CityPage from "./routes/city/page.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./global.css";

/* react router setup */
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
  /* 404 and all other routes */
  {
    path: "*",
    element: <>TODO</>,
  },
]);

/* tanstack query setup */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // requests become stale after 10 seconds
      staleTime: 10_000,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
