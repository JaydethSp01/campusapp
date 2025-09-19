import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("Error:", error);

  if (res.headersSent) {
    return next(error);
  }

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  const message =
    process.env.NODE_ENV === "production"
      ? "Error interno del servidor"
      : error.message;

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV !== "production" && { stack: error.stack }),
  });
};

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    error: "Endpoint no encontrado",
    path: req.path,
    method: req.method,
  });
};

