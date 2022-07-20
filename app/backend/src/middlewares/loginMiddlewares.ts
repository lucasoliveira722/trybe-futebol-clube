import { Request, Response, NextFunction } from 'express';
import Joi = require ('joi');
import HttpException from './HttpExceptions';

export default (req: Request, _res: Response, next: NextFunction) => {
  const { error } = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }).validate(req.body);
  if (error) {
    // const obj = { status: 400, message: error.message };
    throw new HttpException(400, 'All fields must be filled');
  }
  next();
};
