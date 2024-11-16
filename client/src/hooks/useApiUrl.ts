import { useParams } from "react-router";

const authUrl = "/auth";
const registerUrl = "/auth/register";
const loginUrl = "/auth/login";
const accoutnRecoverUrl = "/auth/account-recovery";
const updateUser = "/auth/update";
const tokenUrl = "/auth/token";
const notesUrl = "/notes";

const useApiUrl = () => {
  const { token, key, id } = useParams();

  const apiUrl = {
    register: {
      main: registerUrl,
      verifyToken: `${registerUrl}/verify-token/${token}/${key}`,
      resendOTP: `${registerUrl}/resend-otp/${token}/${key}`,
      verifyOTP: (otp: string) =>
        `${registerUrl}/verify-otp/${token}/${key}/${otp}`,
      uploadAvatar: `${registerUrl}/upload-avatar`,
    },
    accountRecovery: {
      sendOTP: (email: string) =>
        `${accoutnRecoverUrl}/send-otp/${email.trim()}`,
      verifyToken: `${accoutnRecoverUrl}/verify-token/${token}/${key}`,
      resendOTP: `${accoutnRecoverUrl}/resend-otp/${token}/${key}`,
      verifyOTP: (otp: string) =>
        `${accoutnRecoverUrl}/verify-otp/${token}/${key}/${otp}`,
      resetPassword: {
        verifyToken: `${accoutnRecoverUrl}/reset-password/verify-token/${token}/${key}`,
        main: `${accoutnRecoverUrl}/reset-password/${token}/${key}`,
      },
    },
    login: {
      main: loginUrl,
    },
    logout: `${authUrl}/logout`,
    authorize: {
      main: `${authUrl}/authorize`,
    },
    user: {
      updateUser: `${updateUser}/user-info`,
      changePassword: `${updateUser}/password`,
      changeAvatar: `${updateUser}/avatar`,
    },
    token: {
      refresh: `${tokenUrl}/refresh`,
    },
    notes: {
      main: notesUrl,
      create: `${notesUrl}/create`,
      favouriteToggle: (id: string) => `${notesUrl}/favourite-toggle/${id}`,
      pinToggle: (id: string) => `${notesUrl}/pin-toggle/${id}`,
      edit: `${notesUrl}/edit/${id}`,
      delete: (id: string) => `${notesUrl}/delete/${id}`,
    },
  };

  return apiUrl;
};

export default useApiUrl;
