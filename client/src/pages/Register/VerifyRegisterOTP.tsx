import AuthFormWrapper from "../../components/AuthFormWrapper";
import VerifyOTP from "../../components/VerifyOTP";
import userApiUrl from "../../hooks/useApiUrl";

const VerifyRegisterOTP = () => {
  const {
    register: { verifyOTP, resendOTP, verifyToken },
  } = userApiUrl();
  return (
    <AuthFormWrapper>
      <VerifyOTP
        title="Account verification"
        verifyTokenApiUrl={verifyToken}
        getOtpConfirmApiUrl={verifyOTP}
        resendOtpApiUrl={resendOTP}
      />
    </AuthFormWrapper>
  );
};

export default VerifyRegisterOTP;
