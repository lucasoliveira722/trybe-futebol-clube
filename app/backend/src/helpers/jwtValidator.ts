import { verify, Secret, JwtPayload } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { UserRequest } from '../interfaces';
import HttpException from '../middlewares/HttpExceptions';

export default async (req: UserRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new HttpException(401, 'Token must be a valid token');
  }
  try {
    const result = verify(token, process.env.JWT_SECRET as Secret) as JwtPayload;
    req.user = result;
    console.log(result);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};
