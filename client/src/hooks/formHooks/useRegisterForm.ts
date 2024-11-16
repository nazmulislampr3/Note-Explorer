import { useNavigate } from "react-router";
import toastifyService from "../../utils/toastify/service";
import useApiUrl from "../useApiUrl";
import useForm from "./useForm";

type RegisterFormDataType = {
  fname: string;
  lname: string;
  email: string;
  birthdate: string;
  avatar: string;
  password: string;
  confirm_password: string;
};

type RegisterErrorType = {
  fname?: string;
  lname?: string;
  email?: string;
  password?: string;
  passwordValidation?: string;
  globalMessage?: string;
  message?: string;
};

type RegisterResponseType = {
  redirectUrl: string;
  message: string;
};

const useRegisterForm = () => {
  const {
    register: { main },
  } = useApiUrl();
  const navigate = useNavigate();
  return useForm<RegisterFormDataType, RegisterErrorType, RegisterResponseType>(
    {
      fname: "",
      lname: "",
      email: "",
      password: "",
      confirm_password: "",
      birthdate: "",
      avatar: "",
    },
    main,
    {
      onRequestSucess({ redirectUrl, message }) {
        navigate(redirectUrl);
        toastifyService.toastify(message);
      },
    }
  );
};

export default useRegisterForm;
