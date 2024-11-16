import { Info } from "lucide-react";
import useVerifyOTP from "../hooks/apiHooks/useVerifyOTP";

const VerifyOTP = ({
  getOtpConfirmApiUrl,
  resendOtpApiUrl,
  verifyTokenApiUrl,
  title,
}: {
  title: string;
  getOtpConfirmApiUrl: (otp: string) => string;
  verifyTokenApiUrl: string;
  resendOtpApiUrl: string;
}) => {
  const {
    verifyingLink,
    linkError,
    email,
    error,
    loading,
    handleSubmit,
    remainingTime,
    resend,
    resending,
    otp,
    setOtp,
  } = useVerifyOTP({
    getVerifyOtpApiUrl: getOtpConfirmApiUrl,
    resendOtpApiUrl,
    verifyLinkApiUrl: verifyTokenApiUrl,
  });

  if (verifyingLink) {
    return <div>Please wait...</div>;
  }

  if (linkError) {
    return <div>{linkError.message}</div>;
  }

  return (
    <div className="w-full max-w-2xl px-3 pt-12 pb-16 bg-slate-800">
      <h3 className="text-3xl font-bold text-center">{title}</h3>
      <div className="mx-auto max-w-96 mt-4">
        <div className="text-lg mt-4">Enter the OTP sent to {email}</div>
        <div className="mt-5">
          <input
            type="text"
            id="otp"
            className="w-full bg-transparent outline-none border-b-2 px-1 py-2 border-b-slate-500 focus:border-b-slate-200 transition-all duration-200 text-3xl font-sans"
            placeholder="******"
            maxLength={6}
            value={otp}
            onChange={({ target: { value } }) => {
              if (Number(value) >= 0) {
                setOtp(value);
              }
            }}
          />
          <div className="mt-3 flex items-center justify-between">
            <div className="font-mono select-none">{remainingTime}</div>
            <button
              className="text-blue-400"
              onClick={resend}
              disabled={resending || loading}
            >
              Resend OTP
            </button>
          </div>
          <div className="mt-8">
            {error ? (
              <div className="mb-3 flex items-center gap-2 text-red-400 text-sm">
                <Info className="size-5" /> {error.message}
              </div>
            ) : null}
            <button
              className="btn bg-teal-600 w-full font-bold hover:bg-teal-500"
              onClick={handleSubmit}
              disabled={loading || otp.length < 6}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
