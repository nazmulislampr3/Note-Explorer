import { ReactNode, useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";

type ActiveTool = "searchbar" | "sidebar" | "sidebar_on_sm" | null;
type ContextValue = {
  activeTool: ActiveTool;
  setActiveTool: React.Dispatch<React.SetStateAction<ActiveTool>>;
  initialize: () => void;
} | null;
const UIContext = createContext<ContextValue>(null);

const UIContextProvider = ({ children }: { children: ReactNode }) => {
  const [activeTool, setActiveTool] = useState<ActiveTool>(null);

  const initialize = () => {
    // setActiveTool(null);
  };

  return (
    <UIContext.Provider value={{ activeTool, setActiveTool, initialize }}>
      {children}
    </UIContext.Provider>
  );
};

export default UIContextProvider;

export const useUIContext = () =>
  useContextSelector(UIContext, (value) => value);
