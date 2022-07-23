import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface IUser {
  username: string;
  email: string;
  role: string;
  password: string;
}

export type IUserLogin = Omit<IUser, 'username' >;

export interface IUserModel {
  findAll(data: IUserLogin): Promise<IUser[]>
}

export interface IUserService {
  login(data: IUserLogin): Promise<string>
}

export type JwtLogin = {
  email: string;
  role: string;
  password: string;
};

export interface UserRequest extends Request {
  user?: JwtPayload
}

export type TokenResponse = {
  email: string;
  role: string;
  password: string;
};
