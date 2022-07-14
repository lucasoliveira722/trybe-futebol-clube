import { Request, Response } from 'express';
import 

export default class LoginController {
  constructor (private service: ILoginService) {
    this.service = service;
  }

  async Login(req: Request, res: Response) {
    const { id, role } = await this.service.login(req.body);

    const token = new Token
  }
}