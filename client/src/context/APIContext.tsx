import { Method } from "axios";
import { ReactNode, useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";

type RequestAndResponse = {
  url: string;
  method: Method;
  data?: any;
};
type ContextValue = {
  apiHistory: RequestAndResponse[];
  setApiHistory: React.Dispatch<React.SetStateAction<RequestAndResponse[]>>;
};
const APIContext = createContext<ContextValue | null>(null);

const APIMemoProvider = ({ children }: { children: ReactNode }) => {
  const [apiHistory, setApiHistory] = useState<RequestAndResponse[]>([]);

  return (
    <APIContext.Provider value={{ apiHistory, setApiHistory }}>
      {children}
    </APIContext.Provider>
  );
};

export default APIMemoProvider;

export const useAPIContext = () =>
  useContextSelector(APIContext, (value) => value);
