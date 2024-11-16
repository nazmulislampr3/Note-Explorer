import { useEffect } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { ApiErrorType, QueryOptionsType } from "../../../types";
import useApiUrl from "../../useApiUrl";
import useMutation from "../useMutation";

type ResponseType = {
  url: string;
};

type MutationReturnType = {
  loading: boolean;
  data: ResponseType | null;
  error: ApiErrorType | null;
};

const useUploadAvatar = (
  file: File | null,
  options?: QueryOptionsType<ResponseType, ApiErrorType>
): MutationReturnType => {
  const { session, setSession } = useAuthContext();
  const {
    register: { uploadAvatar },
    user: { changeAvatar },
  } = useApiUrl();
  const apiUrl = session ? changeAvatar : uploadAvatar;

  const [handleSubmit, { data, error, loading }] = useMutation<
    ResponseType,
    ApiErrorType,
    FormData
  >({
    apiUrl,
    method: session ? "PUT" : "POST",
    onComplete(data) {
      options?.onComplete?.(data);
      if (session) {
        setSession((prev) => ({ ...prev!, avatar: data.url }));
      }
    },
    onError(error) {
      options?.onError?.(error);
    },
    onLoading() {
      options?.onLoading?.();
    },
    finally() {
      options?.finally?.();
    },
  });

  useEffect(() => {
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);
      handleSubmit({
        query: formData,
      });
    }
  }, [file]);

  return { data, error, loading };
};

export default useUploadAvatar;
