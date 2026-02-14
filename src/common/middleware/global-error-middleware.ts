import { logger } from "../../lib/logger";
import { ErrorType } from "../types/error.types";
import { NextFunction, Request, Response } from "express";

const errorMiddleWare = (
  err: ErrorType,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!err) {
    return next();
  }

  // if (err instanceof  || err instanceof ) {
  //   const statusCode = err.statusCode || 500;
  //   const message = err.message || "Internal server error";
  //   const cause = err.cause || {};
  //   const name = err.name || "API Error";
  //   return res.status(statusCode).json({ message, cause, name });
  // }

  return res.status(500).json({ message: "Internal server error" });
};
export { errorMiddleWare };
