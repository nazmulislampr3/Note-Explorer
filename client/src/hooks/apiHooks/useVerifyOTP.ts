import { Dispatch, useEffect, useState } from "react";
import { ApiErrorType, ApiResponseDataType } from "../../types";
import formatMsToTime from "../../utils/formatMsToTime";
import useApiUrl from "../useApiUrl";
import useMutation from "./useMutation";
import useQuery from "./useQuery";
import toastifyService from "../../utils/toastify/service";
import { useNavigate } from "react-router";

type ReturnType = {
  handleSubmit: () => Promise<void>;
  otp: string;
  setOtp: Dispatch<React.SetStateAction<string>>;
  resend: () => Promise<void>;
  loading: boolean;
  resending: boolean;
  error: ApiErrorType | null;
  linkError: ApiErrorType | null;
  verifyingLink: boolean;
  email: string;
  expiresAt: string;
  remainingTime: string;
};

type VerifyOtpResponseType = {
  message: string;
  redirectUrl: string;
};

type ResendOTPResopnseType = {
  expiresAt: string;
};

const useVerifyOTP = ({
  getVerifyOtpApiUrl,
  resendOtpApiUrl,
  verifyLinkApiUrl,
}: {
  verifyLinkApiUrl: string;
  getVerifyOtpApiUrl: (otp: string) => string;
  resendOtpApiUrl: string;
}): ReturnType => {
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<ApiErrorType | null>(null);
  const [expiresAt, setExpiresAt] = useState<string>("");
  const [remaining, setRemaining] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (expiresAt) {
      setRemaining(new Date(expiresAt).getTime() - new Date().getTime());
      const interval = setInterval(() => {
        const diff = new Date(expiresAt).getTime() - new Date().getTime();
        setRemaining(Math.max(0, diff));
        if (diff <= 0) {
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [expiresAt]);

  const {
    error: linkError,
    loading: verifyingLink,
    data,
  } = useQuery<ReturnType, ApiErrorType>(verifyLinkApiUrl, {
    onComplete(data) {
      setExpiresAt(data.expiresAt);
    },
  });

  const [handleSubmit, { loading }] = useMutation<
    VerifyOtpResponseType,
    ApiErrorType
  >({
    apiUrl: getVerifyOtpApiUrl(otp),
    onLoading() {
      setError(null);
    },
    onError(error) {
      setError(error);
    },
    onComplete(data) {
      navigate(data.redirectUrl);
      toastifyService.toastify(data.message);
    },
  });

  const [resend, { loading: resending }] = useMutation<
    ResendOTPResopnseType,
    ApiErrorType
  >({
    apiUrl: resendOtpApiUrl,
    onLoading() {
      setError(null);
    },
    onError(error) {
      setError(error);
    },
    onComplete(data) {
      setExpiresAt(data.expiresAt);
    },
  });

  return {
    linkError: linkError || null,
    verifyingLink,
    email: data?.email || "",
    expiresAt,
    error,
    handleSubmit,
    resend,
    resending,
    loading,
    otp,
    setOtp,
    remainingTime: formatMsToTime(remaining),
  };
};

export default useVerifyOTP;
