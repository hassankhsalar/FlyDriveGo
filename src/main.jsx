import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.jsx";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./Provider/AuthProvider.jsx";
import { LoadingProvider } from "./contexts/LoadingContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <LoadingProvider>
        <RouterProvider router={router} />
        <Toaster />
      </LoadingProvider>
    </AuthProvider>
  </StrictMode>
);