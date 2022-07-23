import { verify, Secret, JwtPayload } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { UserRequest } from '../interfaces';
import HttpException from '../middlewares/HttpExceptions';

export default async (req: UserRequest, _res: Response, _next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new HttpException(401, 'Token not found, please try again');
  }
  try {
    const result = verify(token, process.env.JWT_SECRET as Secret) as JwtPayload;
    req.user = result.data;
    // Descobrir como funciona esse retorno --
    // Criar a req.user
  } catch (err) {
    throw new HttpException(401, 'Token invalid; Please provide a valid token');
  }
};
