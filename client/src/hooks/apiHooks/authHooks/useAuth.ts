import { useAuthContext } from "../../../context/AuthContext";
import { UserType } from "../../../types";

type ReturnType = {
  session: UserType | null;
  loading: boolean;
};
const useAuth = (): ReturnType => {
  const { session, loading } = useAuthContext();
  return { session, loading };
};

export default useAuth;
