import axios from "axios";
import { useEffect, useState } from "react";

type QueryOptionsType<QueryType, ResponseDataType, ErrorType> = {
  query?: QueryType;
  onLoading?: () => void;
  onComplete?: (data: ResponseDataType) => void;
  onError?: (error: ErrorType) => void;
  fetch?: boolean;
};

type ReturnType<ResponseDataType, ErrorType> = {
  data: ResponseDataType | null;
  error: ErrorType | null;
  loading: boolean;
  refetch: () => Promise<void>;
};

const useQuery = <ResponseDataType = null, ErrorType = null, QueryType = null>(
  apiUrl: string,
  options?: QueryOptionsType<QueryType, ResponseDataType, ErrorType>
): ReturnType<ResponseDataType, ErrorType> => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<ResponseDataType | null>(null);
  const [error, setError] = useState<ErrorType | null>(null);

  const fetch = options?.fetch === false ? false : true;

  const handleFetch = async () => {
    try {
      const { data } = await axios.get(apiUrl, {
        data: options?.query,
        withCredentials: true,
      });
      setData(data);
      options?.onComplete?.(data);
    } catch ({ response: { data } }: any) {
      setError(data);
      options?.onError?.(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fetch) {
      handleFetch();
    }
  }, [apiUrl, options?.query, options?.fetch]);

  return { data, error, loading, refetch: handleFetch };
};

export default useQuery;
