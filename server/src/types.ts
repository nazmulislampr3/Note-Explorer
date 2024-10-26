import { Request as Req } from "express";
import { Document } from "mongoose";

export type CloudinaryImage = { url: string; public_id?: string };

export interface DB_User extends Document {
  fname: string;
  lname: string;
  birthdate: Date;
  email: string;
  recoveryEmail?: string;
  avatar?: CloudinaryImage | string;
  password: string;
  refreshToken?: string;
  matchPassword: (password: string) => Promise<any>;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
}

export interface Request extends Req {
  user?: DB_User;
}

export type FileTypes = "image";

export type ImageMimeType = "image/jpeg" | "image/jpg" | "image/png";
