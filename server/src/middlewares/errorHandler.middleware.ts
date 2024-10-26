import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError";
import { ZodError } from "zod";
import { MulterError } from "multer";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    console.log({ ApiError: err });
    let errObj: any = {};
    if (err.data) {
      errObj.globalMessage = err.message;
      errObj = { ...errObj, ...err.data };
    } else {
      errObj.message = err.message;
    }

    return res.status(err.statusCode).json(errObj);
  }

  if (err instanceof ZodError) {
    const errObj: any = {};
    err.issues.forEach(({ message, path }) => {
      const key = path[0] || "message";
      errObj[key] = message;
    });

    return res.status(400).json(errObj);
  }

  if (err instanceof MulterError) {
    return res.status(400).json({ message: `Multer error: ${err.message}` });
  }

  console.log({ err });

  return res
    .status(500)
    .json({ message: err.message || "Internal server error!" });
};

export default errorHandler;
