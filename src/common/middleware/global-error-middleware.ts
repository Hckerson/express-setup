import { logger } from "../../lib/logger";
import { NextFunction, Request, Response } from "express";
import { AmadeusError, OpenWeatherError } from "../errors/api.error";
import { RouteError } from "../errors/route-errors";

const errorMiddleWare = (
  err: RouteError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!err) {
    return next();
  }

  if(res.headersSent){
    return next(err)
  }
  const isApiErrorType = err instanceof AmadeusError || err instanceof OpenWeatherError;
  if (isApiErrorType) {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    const cause = err.cause || {};
    const name = err.name || "API Error";
    return res.status(statusCode).json({ message, cause, name });
  }

  return res.status(500).json({ message: "Internal server error" });
};
export { errorMiddleWare };
