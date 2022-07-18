export interface IUser {
  username: string;
  email: string;
  role: string;
  password: string;
}

export type IUserLogin = Omit<IUser, 'role' >; 

export interface IUserModel {
  findAll(data: Omit<IUser, 'username' | 'role' | 'password'>): IUser
}
