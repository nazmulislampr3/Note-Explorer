import { Router } from "express";
import {
  accountRecoverySendOTP,
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
} from "../controllers/auth.controller.js";
import matchPassword from "../middlewares/matchPassword.middleware.js";
import requireAuth from "../middlewares/requireAuth.middleware.js";
import validateData from "../middlewares/validateData.middleware.js";
import validateEmail from "../middlewares/validateEmail.middleware.js";
import { imageUploader } from "../utils/multer/uploader.multer.js";
import changePasswordSchema from "../validators/changePassword.validator.js";
import loginSchema from "../validators/login.validator.js";
import passwordSchema from "../validators/password.validator.js";
import registerSchema from "../validators/register.validator.js";
import userInfoSchema from "../validators/userInfo.validator.js";

const authRouter = Router();

const reigsterRouter = Router();
const accountRecoveryRouter = Router();
const updateUserRouter = Router();
const tokenRouter = Router();

// Registration
reigsterRouter.route("/").post(
  (req, res, next) => {
    req.body.birthdate = req.body.birthdate || new Date();
    next();
  },
  validateData(registerSchema),
  register
);
reigsterRouter.route("/verify-token/:token/:key").get(verifyRegisterToken);
reigsterRouter.route("/resend-otp/:token/:key").get(resendOTP);
reigsterRouter.route("/verify-otp/:token/:key/:otp").get(verifyOTP);

// Login
authRouter.route("/login").post(validateData(loginSchema), login);

// token
tokenRouter.route("/access-token").get(getNewAccessToken);

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
  .use("/token", tokenRouter)
  .use("/logout", logout);

export default authRouter;
