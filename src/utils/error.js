import { Request, Response, NextFunction } from "express";

class CustomError extends Error {
  statusCode;

  constructor({ statusCode, message }) {
    super(message);
    this.statusCode = statusCode;
  }
}

const handleError = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  console.error(err);

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

export { handleError, CustomError };
