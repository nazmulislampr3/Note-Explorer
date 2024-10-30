import { CookieOptions } from "express";
import jwt from "jsonwebtoken";
import randomString from "randomstring";
import { OtpOrToken } from "../models/otpOrToken.model";
import { User } from "../models/user.model";
import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
import deleteFile from "../utils/cloudinary/deleteFile.cloudinary";
import cloudinaryUploadPhoto from "../utils/cloudinary/uploadPhoto.cloudinary";
import generateOTP from "../utils/generateOTP";
import { accountRecoverOTPMail, registerOTPMail } from "../utils/mailer/mails";
import sendMail from "../utils/mailer/sendMail";
import maskEmail from "../utils/maskEmail";

export const register = asyncHandler(async (req, res) => {
  const { email, fname } = req.body;

  const existUser = await User.exists({ email });

  if (existUser) {
    throw new ApiError(400, "User already exists with this email.");
  }

  const registerKey = randomString.generate(120);

  const registerToken = jwt.sign(req.body, registerKey);

  const otp = generateOTP();

  await new OtpOrToken({
    registerKey,
    registerToken,
    otp,
  }).save();

  // send otp via mail
  await sendMail({
    subject: "Account verification.",
    to: email,
    html: await registerOTPMail({ otp, reciever: fname }),
  });

  return res.json({ token: registerToken, key: registerKey });
});

export const verifyRegisterToken = asyncHandler(async (req, res) => {
  const { token, key } = req.params;

  const findToken = await OtpOrToken.findOne({
    registerToken: token,
    registerKey: key,
  });

  if (!findToken) {
    throw new ApiError(403, "Invalid token!");
  }

  const { email }: any = jwt.verify(token, key);

  let expiresAt = new Date(findToken.createdAt);

  expiresAt.setSeconds(expiresAt.getSeconds() + Number(process.env.OTP_EXPIRY));

  return res.json({ email: maskEmail(email), expiresAt });
});

export const verifyOTP = asyncHandler(async (req, res) => {
  const { token, key, otp }: any = req.params;

  const findToken = await OtpOrToken.findOne({
    registerToken: token,
    registerKey: key,
  }).select("otp");

  if (!findToken) {
    throw new ApiError(400, "Invalid token!");
  }

  if (otp !== findToken?.otp) {
    throw new ApiError(400, "Wrong OTP!");
  }

  const userObj = jwt.verify(token, key);

  await new User(userObj).save();

  await OtpOrToken.deleteOne({ registerToken: token, registerKey: key });

  return res.json({ message: "User registration successfull." });
});

export const resendOTP = asyncHandler(async (req, res) => {
  const { token, key }: any = req.params;

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

  await user.save({ validateBeforeSave: false });

  const options: CookieOptions = {
    httpOnly: true,
    secure: true,
  };

  return res
    .cookie("accessToken", accessToken, {
      ...options,
      maxAge: Number(process.env.JWT_ACCESS_TOKEN_EXPIRY) * 60 * 1000,
    })
    .cookie("refreshToken", refreshToken, options)
    .json({
      id: _id,
      fname,
      lname,
      avatar,
      birthdate: birthdate || "",
    });
});

// token
export const getNewAccessToken = asyncHandler(async (req, res) => {
  const refreshToken =
    req.cookies?.refreshToken || req.headers["x-refresh-token"];

  if (!refreshToken) {
    throw new ApiError(
      400,
      "No refresh token available to generate a new access token."
    );
  }

  const userId = (
    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET!) as any
  ).id;

  const user = await User.findOne({ _id: userId, refreshToken });

  if (!user) {
    throw new ApiError(400, "Invalid refresh token!");
  }

  const accessToken = user.generateAccessToken();

  return res.cookie("accessToken", accessToken).end();
});

// logout
export const logout = asyncHandler(async (req, res) => {
  const refreshToken =
    req.cookies?.refreshToken || req.headers["x-refresh-token"];

  const userId = (
    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET!) as any
  ).id;

  if (refreshToken) {
    await User.updateOne({ _id: userId }, [
      {
        $set: {
          refreshToken: {
            $filter: {
              input: "$refreshToken",
              as: "token",
              cond: {
                $ne: ["$$token", refreshToken],
              },
            },
          },
        },
      },
    ]);
  }

  return res.clearCookie("accessToken").clearCookie("refreshToken").end();
});

// Account recovery
export const accountRecoverySendOTP = asyncHandler(async (req, res) => {
  const { email } = req.params;

  const user = await User.findOne({ email }).select("fname");

  if (!user) {
    throw new ApiError(400, "No account exists with this email.");
  }

  const key = randomString.generate(64);

  const token = jwt.sign({ email }, key);

  const otp = generateOTP();

  await new OtpOrToken({
    accountRecoveryToken: token,
    accountRecoveryKey: key,
    otp,
  }).save();

  // send otp via email
  await sendMail({
    subject: "Account Recovery",
    to: email,
    html: await accountRecoverOTPMail({ otp, reciever: user.fname }),
  });

  return res.json({ token, key });
});

export const verifyAccountRecoveryToken = asyncHandler(async (req, res) => {
  const { token, key } = req.params;

  return res.json({ token, key });

  // const validToken = await OtpOrToken.findOne({
  //   accountRecoveryToken: token,
  //   accountRecoveryKey: key,
  // });

  // if (!validToken) {
  //   throw new ApiError(400, "Invalid token.");
  // }

  // const { email }: any = jwt.verify(token, key);

  // if (email) {
  //   throw new ApiError(400, "Invalid token!");
  // }

  // const expiresAt = new Date(validToken.createdAt);
  // expiresAt.setSeconds(expiresAt.getSeconds() + Number(process.env.OTP_EXPIRY));

  // return res.json({ email: maskEmail(email), expiresAt, token, key });
});

export const resendAccountRecoveryOTP = asyncHandler(async (req, res) => {
  const { token, key } = req.params;

  await OtpOrToken.deleteOne({
    accountRecoveryToken: token,
    accountRecoveryKey: key,
  });

  const email = (jwt.verify(token, key) as any).email;
  if (!email) {
    throw new ApiError(400, "Invalid token!");
  }

  const user = await User.findOne({ email }).select("fname");
  if (!user) {
    throw new ApiError(400, "Something went wrong!");
  }

  const otp = generateOTP();

  const { createdAt } = await new OtpOrToken({
    accountRecoveryToken: token,
    accountRecoveryKey: key,
    otp,
  }).save();

  // send otp via mail
  await sendMail({
    to: email,
    subject: "Account Recovery.",
    html: await accountRecoverOTPMail({ otp, reciever: user.fname }),
  });

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
    key: resetPasswordKey,
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
    message: "Account recovered successfully. Now you can login.",
  });
});

// Update user details
export const updateUserInfo = asyncHandler(async (req, res) => {
  const { password, ...others } = req.body;
  // req.user = { ...req.user, ...others };
  Object.assign(req.user!, others);
  const updatedUser = await req.user!.save({ validateBeforeSave: false });

  const { fname, lname, email, avatar } = updatedUser;

  return res.json({
    message: "User details updated successfully.",
    user: { fname, lname, email, avatar },
  });
});

export const updateAvatar = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "No file uploaded.");
  }
  const url = await cloudinaryUploadPhoto("avatars", req.file!);

  deleteFile(req.user?.avatar || "");

  req.user!.avatar = url;
  await req.user!.save({ validateBeforeSave: false });

  return res.json({ url });
});

export const changePassword = asyncHandler(async (req, res) => {
  const userDoc = await User.findById(req.user!.id).select("password");
  const passwordMatched = await userDoc?.matchPassword(req.body.old_password);

  if (!passwordMatched) {
    throw new ApiError(400, "Incorrect old password.");
  }

  req.user!.password = req.body.password;
  await req.user!.save({ validateBeforeSave: false });

  return res.json({ message: "Password changed successfully!" });
});
