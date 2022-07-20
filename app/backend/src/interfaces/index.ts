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
