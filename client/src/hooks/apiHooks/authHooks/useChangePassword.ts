import { ApiResponseDataType, QueryOptionsType } from "../../../types";
import toastifyService from "../../../utils/toastify/service";
import useApiUrl from "../../useApiUrl";
import useMutation from "../useMutation";

export type ChangePasswordType = {
  old_password: string;
  password: string;
  confirm_password: string;
};
export type ChangePasswordErrorType = {
  old_password?: string;
  password?: string;
  confirm_password?: string;
  globalMessage?: string;
  message?: string;
};
const useChangePassword = (
  changePasswordData: ChangePasswordType,
  options?: QueryOptionsType<ApiResponseDataType, ChangePasswordErrorType>
) => {
  const {
    user: { changePassword },
  } = useApiUrl();

  return useMutation<
    ApiResponseDataType,
    ChangePasswordErrorType,
    ChangePasswordType
  >({
    apiUrl: changePassword,
    method: "PUT",
    query: changePasswordData,
    onLoading() {
      options?.onLoading?.();
    },
    onComplete(data) {
      options?.onComplete?.(data);
      toastifyService.toastify(data.message);
    },
    onError(error) {
      options?.onError?.(error);
    },
    finally() {
      options?.finally?.();
    },
  });
};

export default useChangePassword;
