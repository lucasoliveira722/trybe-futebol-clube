import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import HttpException from '../middlewares/HttpExceptions';

export default async (req: Request, _res: Response, _next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new HttpException(401, 'Token not found');
  }
  try {
    const result = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret);
    return result;
  } catch (err) {
    throw new HttpException(401, 'Token must be a valid token');
  }
};
