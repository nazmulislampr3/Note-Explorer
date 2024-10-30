import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { model, Schema, Types } from "mongoose";
import { DB_User } from "../types";
import cleanMongooseDocument from "../utils/cleanMongooseDocument";
const { Date, String } = Schema.Types;

const userSchema = new Schema<DB_User>(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    birthdate: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    recoveryEmail: String,
    avatar: String,
    password: {
      type: String,
      required: true,
    },
    refreshToken: [String],
  },
  { timestamps: true, versionKey: false }
);

userSchema.pre("save", async function (next) {
  cleanMongooseDocument(this);
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function (
  password: string
): Promise<boolean> {
  const matched = await bcrypt.compare(password, this.password);
  return matched;
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_ACCESS_TOKEN_SECRET!);
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_REFRESH_TOKEN_SECRET!);
};

export const User = model<DB_User>("User", userSchema);
