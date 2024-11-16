import useApiUrl from "../../useApiUrl";
import useVerifyOTP from "../useVerifyOTP";

const useRegisterOtp = () => {
  const {
    register: { verifyOTP, verifyToken, resendOTP },
  } = useApiUrl();

  return useVerifyOTP({
    getVerifyOtpApiUrl: verifyOTP,
    resendOtpApiUrl: resendOTP,
    verifyLinkApiUrl: verifyToken,
  });
};

export default useRegisterOtp;
