import { NextFunction, Response } from 'express';
import { IUserService, UserRequest, TokenResponse } from '../interfaces';

export default class LoginController {
  constructor(private service: IUserService) {
    this.service = service;
  }

  async Login(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const login = await this.service.login(req.body);
      console.log(login);
      return res.status(200).json({ token: login });
    } catch (error) {
      next(error);
    }
  }

  static returnRole(req: UserRequest, res: Response) {
    const { role } = req.user as TokenResponse;
    res.status(200).json({ role });
  }
}
