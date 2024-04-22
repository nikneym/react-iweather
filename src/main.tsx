import React from "react";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import IndexPage from "./routes/page.tsx";
import CityPage from "./routes/city/page.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./global.css";

// TODO: the newest react-router has support for loader functions similar to Remix:
// https://reactrouter.com/en/main/route/loader
// since we're using tanstack query though, I've omitted them

/* react router setup */
const router = createBrowserRouter([
  /* index */
  { path: "/", element: <IndexPage /> },
  {
    path: "/city/:query/:locationID/:lat/:lon",
    element: <CityPage />,
    errorElement: <Navigate to="/" replace />,
  },
  /* redirect to index in all other cases */
  { path: "*", element: <Navigate to="/" replace /> },
]);

/* tanstack query setup */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // requests become stale after 10 seconds
      staleTime: 10_000,
      // only try requesting for 3 times
      retry: 3,
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
