import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./root.scss";
import "./index.scss";
import UIContextProvider from "./context/UIContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UIContextProvider>
      <App />
    </UIContextProvider>
  </StrictMode>
);
