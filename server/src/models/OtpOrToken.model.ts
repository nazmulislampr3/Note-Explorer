import { model, Schema } from "mongoose";
import cleanMongooseDocument from "./../utils/cleanMongooseDocument";

const otpSchema = new Schema({
  otp: String,
  registerToken: String,
  registerKey: String,
  // account recovery
  accountRecoveryToken: String,
  accountRecoveryKey: String,
  // reset password
  resetPasswordToken: String,
  resetPasswordKey: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: `${Number(process.env.OTP_EXPIRY) / 60}m`,
  },
});

otpSchema.pre("save", function (next) {
  cleanMongooseDocument(this);
  next();
});

export const OtpOrToken = model("OtpOrToken", otpSchema);
