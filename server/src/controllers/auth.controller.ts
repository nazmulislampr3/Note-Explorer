import { CookieOptions } from "express";
import jwt from "jsonwebtoken";
import randomString from "randomstring";
import { OtpOrToken } from "../models/OtpOrToken.model";
import { User } from "../models/user.model";
import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
import cloudinaryUploadPhoto from "../utils/cloudinaryUploadPhoto";
import generateOTP from "../utils/generateOTP";
import maskEmail from "../utils/maskEmail";

export const register = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const existUser = await User.exists({ email });

  if (existUser) {
    throw new ApiError(400, "User already exists with this email.");
  }

  const registerKey = "";

  const registerToken = jwt.sign(req.body, registerKey);

  const otp = generateOTP();

  await new OtpOrToken({
    registerKey,
    registerToken,
    otp,
  }).save();

  // send otp via mail

  return res.json({ token: registerToken, key: registerKey });
});

export const verifyRegisterToken = asyncHandler(async (req, res) => {
  const { token, key }: any = req.query;

  const findToken = await OtpOrToken.findOne({ token, key });

  if (!findToken) {
    throw new ApiError(403, "Invalid token!");
  }

  const { email }: any = jwt.verify(token, key);

  let expiresAt = new Date(findToken.createdAt);

  expiresAt.setSeconds(expiresAt.getSeconds() + Number(process.env.OTP_EXPIRY));

  return res.json({ email: maskEmail(email), expiresAt });
});

export const verifyOTP = asyncHandler(async (req, res) => {
  const { token, key, otp }: any = req.query;

  const findToken = await OtpOrToken.findOne({ token, key });

  if (!findToken) {
    throw new ApiError(400, "Invalid token!");
  }

  if (otp !== findToken?.otp) {
    throw new ApiError(400, "Wrong OTP!");
  }

  OtpOrToken.deleteOne({ token, key });

  return res.json({ message: "User registration successfull." });
});

export const resendOTP = asyncHandler(async (req, res) => {
  const { token, key }: any = req.query;

  const { email }: any = jwt.verify(token, key);

  const otp = generateOTP();

  const { createdAt } = await new OtpOrToken({
    token,
    key,
    otp,
  }).save();

  let expiresAt = new Date(createdAt);
  expiresAt.setSeconds(expiresAt.getSeconds() + Number(process.env.OTP_EXPIRY));

  return res.json({ expiresAt });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "Invalid email or password!");
  }

  const matchedPassword = await user.matchPassword(password);

  if (!matchedPassword) {
    throw new ApiError(400, "Invalid email or password!");
  }

  const { _id, fname, lname, avatar, birthdate } = user;

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = [...(user.refreshToken || []), refreshToken];

  await user.save();

  const options: CookieOptions = {
    httpOnly: true,
    secure: true,
  };

  return res
    .cookie("accessToken", accessToken, {
      ...options,
      maxAge: 4000,
    })
    .cookie("refreshToken", refreshToken, options)
    .json({
      id: _id,
      fname,
      lname,
      avatar,
      birthdate,
    });
});

// Account recovery
export const accountRecoverySendOTP = asyncHandler(async (req, res) => {
  const { email } = req.params;

  const exists = await User.exists({ email });

  if (!exists) {
    throw new ApiError(400, "No account exists with this email.");
  }

  const key = randomString.generate(64);

  const token = jwt.sign({ email }, key);

  const otp = generateOTP();

  // send otp via email

  await new OtpOrToken({
    accountRecoveryToken: token,
    accountRecoveryKey: key,
    otp,
  }).save();

  return res.json({ token, key });
});

export const verifyAccountRecoveryToken = asyncHandler(async (req, res) => {
  const { token, key } = req.params;

  const validToken = await OtpOrToken.findOne({
    accountRecoveryToken: token,
    accountRecoveryKey: key,
  });

  if (!validToken) {
    throw new ApiError(400, "Invalid token.");
  }

  const { email }: any = jwt.verify(token, key);

  if (email) {
    throw new ApiError(400, "Invalid token!");
  }

  const expiresAt = new Date(validToken.createdAt);
  expiresAt.setSeconds(expiresAt.getSeconds() + Number(process.env.OTP_EXPIRY));

  return res.json({ email: maskEmail(email), expiresAt, token, key });
});

export const resendAccountVerifyOTP = asyncHandler(async (req, res) => {
  const { token, key } = req.params;

  await OtpOrToken.deleteOne({
    accountRecoveryToken: token,
    accountRecoveryKey: key,
  });

  const email = (jwt.verify(token, key) as any).email;

  if (!email) {
    throw new ApiError(400, "Invalid token!");
  }

  const otp = generateOTP();

  const { createdAt } = await new OtpOrToken({
    accountRecoveryToken: token,
    accountRecoveryKey: key,
    otp,
  }).save();

  // send otp via mail

  const expiresAt = new Date(createdAt);
  expiresAt.setSeconds(expiresAt.getSeconds() + Number(process.env.OTP_EXPIRY));

  return res.json({ expiresAt });
});

export const verifyAccountRecoveryOTP = asyncHandler(async (req, res) => {
  const { token, key, otp } = req.params;

  const otpDoc = await OtpOrToken.findOne({
    accountRecoveryToken: token,
    accountRecoveryKey: key,
    otp,
  });

  if (!otpDoc) {
    throw new ApiError(400, "Invalid token!");
  }

  if (otpDoc.otp !== otp) {
    throw new ApiError(400, "Wrong OTP!");
  }

  await OtpOrToken.deleteOne({ _id: otpDoc._id });

  const email = (jwt.verify(token, key) as any).email;

  const resetPasswordKey = randomString.generate(64);
  const resetPasswordToken = jwt.sign({ email }, resetPasswordKey);

  await new OtpOrToken({ resetPasswordToken, resetPasswordKey }).save();

  return res.json({
    token: resetPasswordToken,
    resetPasswordKey: resetPasswordKey,
  });
});

export const verifyResetPasswordToken = asyncHandler(async (req, res) => {
  const { token, key } = req.params;

  const exists = await OtpOrToken.exists({
    resetPasswordToken: token,
    resetPasswordKey: key,
  });

  if (!exists) {
    throw new ApiError(400, "Invalid token!");
  }

  return res.json({ message: "Token validation successfull!" });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, key } = req.params;
  const password = req.body.password;

  const tokenDoc = await OtpOrToken.findOne({
    resetPasswordToken: token,
    resetPasswordKey: key,
  });

  if (!tokenDoc) {
    throw new ApiError(400, "Invalid token!");
  }

  const email = (jwt.verify(token, key) as any).email;

  if (!email) {
    throw new ApiError(400, "Invalid token!");
  }

  const user = await User.findOne({ email }).select("password");

  if (!user) {
    throw new ApiError(400, "No user exists with this email!");
  }

  user.password = password;

  await user.save({ validateBeforeSave: false });

  return res.json({
    message: "Account recoverd successfully. Now you can login.",
  });
});

// Update user details
export const updateUserInfo = asyncHandler(async (req, res) => {
  const { password, ...others } = req.body;
  let user = req.user!;
  user = { ...user, ...others };

  await user.save({ validateBeforeSave: false });

  return res.json({ message: "User info updated successfully.", user });
});

export const updateAvatar = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "No file uploaded.");
  }
  const url = await cloudinaryUploadPhoto("avatars", req.file!);

  // // req.user!.avatar = { url, public_id };
  // // await req.user!.save({ validateBeforeSave: false });

  return res.json({ avatar: url });
});

export const changePassword = asyncHandler(async (req, res) => {
  let user = req.user!;
  user.password = req.body.password;
  await user.save({ validateBeforeSave: false });

  return res.json({ message: "Password changed successfully!" });
});
