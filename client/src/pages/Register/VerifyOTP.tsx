import userApiUrl from "../../hooks/useApiUrl";

const VerifyOTP = () => {
  const apiUrl = userApiUrl();
  console.log(apiUrl.register);
  return <div>VerifyOTP</div>;
};

export default VerifyOTP;
