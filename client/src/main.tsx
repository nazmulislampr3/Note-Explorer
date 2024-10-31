import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import UIContextProvider from "./context/UIContext.tsx";
import APIMemoProvider from "./context/APIContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UIContextProvider>
      <APIMemoProvider>
        <App />
      </APIMemoProvider>
    </UIContextProvider>
  </StrictMode>
);
