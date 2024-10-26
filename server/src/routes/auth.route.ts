import { Router } from "express";
import {
  accountRecoverySendOTP,
  changePassword,
  login,
  register,
  resendOTP,
  updateAvatar,
  updateUserInfo,
  verifyAccountRecoveryOTP,
  verifyAccountRecoveryToken,
  verifyOTP,
  verifyRegisterToken,
  verifyResetPasswordToken,
} from "../controllers/auth.controller";
import matchPassword from "../middlewares/matchPassword.middleware";
import requireAuth from "../middlewares/requireAuth.middleware";
import validateData from "../middlewares/validateData.middleware";
import validateEmail from "../middlewares/validateEmail.middleware";
import { uploadImage } from "../utils/uploader";
import changePasswordSchema from "../validators/changePassword.validator";
import loginSchema from "../validators/login.validator";
import passwordSchema from "../validators/password.validator";
import registerSchema from "../validators/register.validator";

const authRouter = Router();

const reigsterRouter = Router();
const accountRecoveryRouter = Router();
const updateUserRouter = Router();

// Registration
reigsterRouter.route("/").post(
  (req, res, next) => {
    req.body.birthdate = req.body.birthdate || new Date();
    next();
  },
  validateData(registerSchema),
  register
);
reigsterRouter.route("/verify-token").get(verifyRegisterToken);
reigsterRouter.route("/resend-otp").get(resendOTP);
reigsterRouter.route("/verify-otp").get(verifyOTP);

// Login
authRouter.route("/login").post(validateData(loginSchema), login);

// Recover account
accountRecoveryRouter
  .route("/send-otp/:email")
  .get(validateEmail, accountRecoverySendOTP);
accountRecoveryRouter
  .route("/verify-token/:token/:key")
  .get(verifyAccountRecoveryToken);
accountRecoveryRouter
  .route("/resend-otp/:token/:key")
  .get(verifyAccountRecoveryToken);
accountRecoveryRouter
  .route("/verify-otp/:token/:key/:otp")
  .get(verifyAccountRecoveryOTP);
accountRecoveryRouter
  .route("/reset-password/verify-token/:token/:key")
  .get(verifyResetPasswordToken);
accountRecoveryRouter
  .route("/reset-password/:token/:key")
  .post(validateData(passwordSchema), verifyAccountRecoveryOTP);

// Update user details
updateUserRouter
  .route("/user-info")
  .post(requireAuth, matchPassword, updateUserInfo);
updateUserRouter
  .route("/password")
  .post(validateData(changePasswordSchema), requireAuth, changePassword);

updateUserRouter
  .route("/avatar")
  .put(uploadImage.single("avatar"), updateAvatar);

authRouter
  .use("/register", reigsterRouter)
  .use("/recover-account", accountRecoveryRouter)
  .use("/update", updateUserRouter);

export default authRouter;
