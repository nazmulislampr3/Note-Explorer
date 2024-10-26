import { model, Schema } from "mongoose";

const registerTokenAndOtpSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: `${Number(process.env.OTP_EXPIRY) / 60}m`,
  },
});

export const RegisterTokenAndOtp = model(
  "RegisterTokenAndOtp",
  registerTokenAndOtpSchema
);
