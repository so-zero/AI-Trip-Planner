import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./page/Home.jsx";
import CreateTrip from "./page/CreateTrip.jsx";
import ViewTrip from "./page/ViewTrip";
import MyTrips from "./page/MyTrips";
import { Toaster } from "./components/ui/sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  { path: "/create-trip", element: <CreateTrip /> },
  { path: "/view-trip/:tripId", element: <ViewTrip /> },
  { path: "/my-trips", element: <MyTrips /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Toaster />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
