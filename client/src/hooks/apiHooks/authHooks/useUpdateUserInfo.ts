import { useAuthContext } from "../../../context/AuthContext";
import { ApiErrorType, QueryOptionsType } from "../../../types";
import toastifyService from "../../../utils/toastify/service";
import useApiUrl from "../../useApiUrl";
import useMutation from "../useMutation";

export type UpdateUserType = { fname: string; lname: string; avatar: string };
type ResponseType = {
  message: "User details updated successfully.";
  user: UpdateUserType;
};
export type UpdateUserQueryType = UpdateUserType & { password: string };
const useUpdateUserInfo = (
  userInfo: UpdateUserQueryType,
  options?: QueryOptionsType<ResponseType, ApiErrorType>
) => {
  const { setSession } = useAuthContext();
  const {
    user: { updateUser },
  } = useApiUrl();

  return useMutation<ResponseType, ApiErrorType, UpdateUserQueryType>({
    apiUrl: updateUser,
    method: "PUT",
    query: userInfo,
    onComplete(data) {
      setSession((prev) => ({ ...prev!, ...data.user }));
      toastifyService.toastify("User info updated successfully!");
      options?.onComplete?.(data);
    },
    onError(error) {
      toastifyService.toastify(error.message, { type: "warning" });
      options?.onError?.(error);
    },
    onLoading() {
      options?.onLoading?.();
    },
    finally() {
      options?.finally?.();
    },
  });
};

export default useUpdateUserInfo;
