import { NextFunction, Request, Response } from 'express';
import { IUserService, UserRequest, TokenResponse } from '../interfaces';

export default class LoginController {
  constructor(private service: IUserService) {
    this.service = service;
  }

  async Login(req: Request, res: Response, next: NextFunction) {
    try {
      const login = await this.service.login(req.body);
      console.log(login);
      return res.status(200).json({ token: login });
    } catch (error) {
      next(error);
    }
  }

  static returnRole(req: UserRequest, res: Response) {
    // ENTENDER PQ ELE NÃO RECONHECE O ROLE DO REQ.USER
    const { role } = req.user as TokenResponse;
    res.status(200).json(role);
  }
}
