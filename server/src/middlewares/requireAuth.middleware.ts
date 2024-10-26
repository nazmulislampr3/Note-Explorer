import { User } from "../models/user.model";
import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
import jwt from "jsonwebtoken";

const requireAuth = asyncHandler(async (req, res, next) => {
  let accessToken =
    req.cookies?.accessToken ||
    req.headers?.["Authorization"]?.toString().replace("Bearer ", "");

  if (!accessToken) {
    throw new ApiError(401, "Unauthorized!");
  }

  const userId = JSON.parse(
    jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET!) as any
  ).id;

  const user = await User.findById(userId).select("-password");
  (req as any).user = user;

  next();
});

export default requireAuth;
