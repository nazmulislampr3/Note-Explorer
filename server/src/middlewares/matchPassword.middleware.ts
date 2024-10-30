import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const matchPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user?._id).select("password");

  const matched = await user!.matchPassword(req.body.password);

  if (!matched) {
    throw new ApiError(400, "Incorrect password!");
  }

  next();
});

export default matchPassword;
