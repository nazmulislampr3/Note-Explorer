import { useParams } from "react-router";

const registerUrl = "/auth/register";
const loginUrl = "/auth/login";
const accoutnRecoverUrl = "/auth/account-recovery";
const updateUser = "/auth/update";
const tokenUrl = "/auth/token";
const notesUrl = "/notes";

const userApiUrl = () => {
  const { token, key, id } = useParams();

  const apiUrl = {
    register: {
      main: registerUrl,
      verifyToken: `${registerUrl}/verify-token/${token}/${key}`,
      resendOTP: `${registerUrl}/resend-otp/${token}/${key}`,
      verifyOTP: (otp: string) =>
        `${registerUrl}/verify-otp/${token}/${key}/${otp}`,
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
    user: {
      updateUser: `${updateUser}/user-info`,
      changePassword: `${updateUser}/password`,
      changeAvatar: `${updateUser}/avatar`,
    },
    token: {
      accessToken: `${tokenUrl}/access-token`,
    },
    notes: {
      main: notesUrl,
      create: `${notesUrl}/create`,
      addToFavourite: (noteId: string) =>
        `${notesUrl}/add-to-favourite/${noteId}`,
      removeFromFavourite: (noteId: string) =>
        `${notesUrl}/remove-from-favourite/${noteId}`,
      pin: (noteId: string) => `${notesUrl}/pin/${noteId}`,
      unpin: (noteId: string) => `${notesUrl}/unpin/${noteId}`,
      edit: `${notesUrl}/edit/${id}`,
    },
  };

  return apiUrl;
};

export default userApiUrl;
