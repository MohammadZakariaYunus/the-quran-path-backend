import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const notFound = (req: Request, res: Response) => {
  console.log("Requested Method:", req.method);
  console.log("Requested Path:", req.originalUrl);
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: "Route Not Found",
  });
};

export default notFound;
