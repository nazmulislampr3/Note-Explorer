import { ZodSchema } from "zod";
import asyncHandler from "../utils/asyncHandler.js";

export const validateData = (schema: ZodSchema) =>
  asyncHandler(async (req, res, next) => {
    req.body = schema.parse(req.body);
    next();
  });

export default validateData;
