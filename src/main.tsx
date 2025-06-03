import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./App";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./contexts/authContext";
import AnimeProvider from "./contexts/animeContext";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AnimeProvider>
      <AuthProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <RouterProvider router={router} />
      </AuthProvider>
    </AnimeProvider>
  </StrictMode>
);
