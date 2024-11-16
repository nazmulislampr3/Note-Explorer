import { Request as Req } from "express";
import { Document } from "mongoose";

export type CloudinaryImage = { url: string; public_id?: string };

export interface DB_User extends Document {
  fname: string;
  lname: string;
  birthdate: Date;
  email: string;
  recoveryEmail?: string;
  avatar?: string;
  password: string;
  refreshToken?: string[];
  matchPassword: (password: string) => Promise<any>;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
}

export type ResizeCompressOptions = {
  maxWidth?: number;
  maxSize?: number; //kb
};

export interface Request extends Req {
  user?: DB_User;
}

export type FileTypes = "image";

export type ImageMimeType = "image/jpeg" | "image/jpg" | "image/png";

export type NoteType = {
  id: any;
  title: string;
  desc: string;
  theme: string;
  addedToFavouriteAt: Date | null;
  pinnedAt: Date | null;
  createdAt: Date;
};
