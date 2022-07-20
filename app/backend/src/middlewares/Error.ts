import { NextFunction, Request, Response } from 'express';
import HttpException from './HttpExceptions';

// function errorMiddleware(
//   error: HttpException,
//   request: Request,
//   response: Response,
//   _next: NextFunction,
// ) {
//   const status = error.status || 500;
//   const message = error.message || 'Something went wrong';
//   response
//     .status(status)
//     .send({
//       status,
//       message,
//     });
// }

export default function errorMiddleware(
  err: HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: err.message });
}
