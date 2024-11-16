import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import NotesContextProvider from "./context/NotesContext.tsx";
import UIContextProvider from "./context/UIContext.tsx";
import "./index.scss";
import store from "./redux/store.ts";
import "./utils/axios.ts";
import ToastContainer from "./utils/toastify/ToastContainer.tsx";
import AuthProvider from "./context/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <Provider store={store}>
      <NotesContextProvider>
        <UIContextProvider>
          <ToastContainer />
          <App />
        </UIContextProvider>
      </NotesContextProvider>
    </Provider>
  </AuthProvider>
);
