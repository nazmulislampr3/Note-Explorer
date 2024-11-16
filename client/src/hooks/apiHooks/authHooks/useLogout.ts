import { useAuthContext } from "../../../context/AuthContext";
import { ApiErrorType, ApiResponseDataType } from "../../../types";
import toastifyService from "../../../utils/toastify/service";
import useApiUrl from "../../useApiUrl";
import useMutation from "../useMutation";

const useLogout = () => {
  const { logout } = useApiUrl();
  const { setSession } = useAuthContext();
  return useMutation<ApiResponseDataType, ApiErrorType>({
    apiUrl: logout,
    onComplete(data) {
      toastifyService.toastify(data.message);
      setSession(null);
    },
  });
};

export default useLogout;
