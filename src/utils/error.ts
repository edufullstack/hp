import { Request, Response, NextFunction } from "express";

interface ICustomError {
  statusCode: number;
  message: string;
  name: string;
}

class CustomError extends Error {
  statusCode: number;

  constructor({ statusCode, message }: ICustomError) {
    super(message);
    this.statusCode = statusCode;
  }
}

const handleError = (
  err: ICustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode = 500, message } = err;

  console.error(err);

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

export { handleError, CustomError };
