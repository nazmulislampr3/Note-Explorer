import { useAuthContext } from "../../context/AuthContext";
import { UserType } from "../../types";
import useApiUrl from "../useApiUrl";
import useForm from "./useForm";

type LoginFormDataType = {
  email: string;
  password: string;
};

type LoginErrorType = {
  email?: string;
  password?: string;
  globalMessage?: string;
  message?: string;
};

const useLoginForm = () => {
  const apiUrl = useApiUrl();
  const { setSession } = useAuthContext();

  return useForm<LoginFormDataType, LoginErrorType, UserType>(
    { email: "", password: "" },
    apiUrl.login.main,
    {
      onRequestSucess(data) {
        setSession(data);
        window.location.href = "/";
      },
    }
  );
};

export default useLoginForm;
