import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./page/Home.jsx";
// import CreateTrip from "./page/CreateTrip.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  // { path: "/create-trip", element: <CreateTrip /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
