import axios, { Method } from "axios";
import { useState } from "react";

type SubmitArgs<QueryType = null> = {
  apiUrl?: string;
  query?: QueryType;
};
type ReturnType<
  ApiResponseDataType = null,
  ApiResponseErrorType = null,
  QueryType = null
> = [
  handleSubmit: (query?: SubmitArgs<QueryType>) => Promise<void>,
  {
    loading: boolean;
    data: ApiResponseDataType | null;
    error: ApiResponseErrorType | null;
  }
];

type OptionsType<QueryType, ApiResponseDataType, ApiResponseErrorType> = {
  apiUrl?: string;
  method?: Method;
  query?: QueryType;
  onLoading?: () => void;
  onComplete?: (data: ApiResponseDataType) => void;
  onError?: (error: ApiResponseErrorType) => void;
  finally?: () => void;
};

const useMutation = <
  ApiResponseDataType = null,
  ApiResponseErrorType = null,
  QueryType = null
>(
  options?: OptionsType<QueryType, ApiResponseDataType, ApiResponseErrorType>
): ReturnType<ApiResponseDataType, ApiResponseErrorType, QueryType> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ApiResponseDataType | null>(null);
  const [error, setError] = useState<ApiResponseErrorType | null>(null);

  const method = options?.method || "POST";

  const handleSubmit = async (submitOptions?: SubmitArgs<QueryType>) => {
    setError(null);
    setLoading(true);
    options?.onLoading?.();
    try {
      const { data } = await axios({
        url: submitOptions?.apiUrl || options?.apiUrl,
        method,
        data: submitOptions?.query || options?.query || {},
        withCredentials: true,
      });
      setData(data);
      options?.onComplete?.(data);
    } catch ({ response: { data } }: any) {
      setError(data);
      options?.onError?.(data);
    } finally {
      setLoading(false);
      options?.finally?.();
    }
  };

  return [handleSubmit, { data, error, loading }];
};

export default useMutation;
