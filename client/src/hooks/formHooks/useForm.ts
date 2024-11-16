import axios from "axios";
import { Dispatch, useEffect, useState } from "react";

type FormReturnType<FormDataType, ErrorType, ApiDataType = null> = {
  handleChange: (e: any) => void;
  handleSubmit: (e: any) => Promise<void>;
  formData: FormDataType;
  setFormData: Dispatch<React.SetStateAction<FormDataType>>;
  setError: Dispatch<React.SetStateAction<ErrorType | null>>;
  error: ErrorType | null;
  loading: boolean;
  showPassword: boolean;
  setShowPassword: Dispatch<React.SetStateAction<boolean>>;
  data?: ApiDataType | null;
};

type OptionsType<ErrorType, ApiDataType> = {
  onRequestSucess?: (data: ApiDataType) => void;
  onLoading?: () => void;
  onError?: (error: ErrorType) => void;
};

const useForm = <FormDataType, ErrorType, ApiDataType = null>(
  initialData: FormDataType,
  url: string,
  options?: OptionsType<ErrorType, ApiDataType>
): FormReturnType<FormDataType, ErrorType, ApiDataType> => {
  const [formData, setFormData] = useState<FormDataType>(initialData);
  const [error, setError] = useState<ErrorType | null>(null);
  const [data, setData] = useState<ApiDataType | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = ({ target: { name, value } }: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!(formData as any)?.password && !(formData as any)?.confirm_password) {
      setShowPassword(false);
    }
  }, [formData]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post(url, formData, {
        withCredentials: true,
      });
      console.log({ data });
      setData(data);
      options?.onRequestSucess?.(data);
    } catch (error: any) {
      setError(error.response.data);
      options?.onError?.(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    error,
    handleChange,
    handleSubmit,
    setFormData,
    setError,
    data,
    showPassword,
    setShowPassword,
    loading,
  };
};

export default useForm;
