import { Router } from "express";
import {
  accountRecoverySendOTP,
  authorize,
  changePassword,
  getNewAccessToken,
  login,
  logout,
  register,
  resendAccountRecoveryOTP,
  resendOTP,
  resetPassword,
  updateAvatar,
  updateUserInfo,
  verifyAccountRecoveryOTP,
  verifyAccountRecoveryToken,
  verifyOTP,
  verifyRegisterToken,
  verifyResetPasswordToken,
} from "./../controllers/auth.controller";
import matchPassword from "./../middlewares/matchPassword.middleware";
import requireAuth from "./../middlewares/requireAuth.middleware";
import validateData from "./../middlewares/validateData.middleware";
import validateEmail from "./../middlewares/validateEmail.middleware";
import { imageUploader } from "./../utils/multer/uploader.multer";
import changePasswordSchema from "./../validators/changePassword.validator";
import loginSchema from "./../validators/login.validator";
import passwordSchema from "./../validators/password.validator";
import registerSchema from "./../validators/register.validator";
import userInfoSchema from "./../validators/userInfo.validator";
import { uploadImage } from "./../controllers/upload.controller";

const authRouter = Router();

const reigsterRouter = Router();
const accountRecoveryRouter = Router();
const updateUserRouter = Router();
const tokenRouter = Router();

// Registration
reigsterRouter.route("/").post(validateData(registerSchema), register);
reigsterRouter.route("/verify-token/:token/:key").get(verifyRegisterToken);
reigsterRouter.route("/resend-otp/:token/:key").post(resendOTP);
reigsterRouter.route("/verify-otp/:token/:key/:otp").post(verifyOTP);
reigsterRouter
  .route("/upload-avatar")
  .post(imageUploader.single("avatar"), uploadImage("avatars"));

// Login
authRouter.route("/login").post(validateData(loginSchema), login);

// authorize
authRouter.route("/authorize").get(requireAuth, authorize);

// token
tokenRouter.route("/refresh").get(getNewAccessToken);

// Recover account
accountRecoveryRouter
  .route("/send-otp/:email")
  .get(validateEmail, accountRecoverySendOTP);
accountRecoveryRouter
  .route("/verify-token/:token/:key")
  .get(verifyAccountRecoveryToken);
accountRecoveryRouter
  .route("/resend-otp/:token/:key")
  .get(resendAccountRecoveryOTP);
accountRecoveryRouter
  .route("/verify-otp/:token/:key/:otp")
  .get(verifyAccountRecoveryOTP);
accountRecoveryRouter
  .route("/reset-password/verify-token/:token/:key")
  .get(verifyResetPasswordToken);
accountRecoveryRouter
  .route("/reset-password/:token/:key")
  .post(validateData(passwordSchema), resetPassword);

// Update user details
updateUserRouter
  .route("/user-info")
  .put(validateData(userInfoSchema), matchPassword, updateUserInfo);
updateUserRouter
  .route("/password")
  .put(validateData(changePasswordSchema), changePassword);
updateUserRouter
  .route("/avatar")
  .put(imageUploader.single("avatar"), updateAvatar);

authRouter
  .use("/register", reigsterRouter)
  .use("/recover-account", accountRecoveryRouter)
  .use("/update", requireAuth, updateUserRouter)
  .use("/token", tokenRouter);

authRouter.route("/logout").post(logout);

export default authRouter;
