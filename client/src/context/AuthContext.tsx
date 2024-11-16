import { Dispatch, ReactNode, useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { UserType } from "../types";
import useApiUrl from "../hooks/useApiUrl";
import useQuery from "../hooks/apiHooks/useQuery";

type ContextType = {
  session: UserType | null;
  loading: boolean;
  setSession: Dispatch<React.SetStateAction<UserType | null>>;
};
const authContext = createContext<ContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<UserType | null>(null);

  const {
    authorize: { main },
  } = useApiUrl();

  const { loading } = useQuery<UserType>(main, {
    fetch: !session,
    onComplete(data) {
      setSession(data);
    },
  });

  return (
    <authContext.Provider value={{ loading, session, setSession }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = () =>
  useContextSelector(authContext, (value) => value)!;
