import { createContext, ReactNode } from "react";

type ContextValue = {
  sideBar: {
    opened: boolean;
  };
};
const UiContext = createContext(null);

const UIContextProvider = ({}: { children: ReactNode }) => {
  return <UiContext.Provider value={null}></UiContext.Provider>;
};
