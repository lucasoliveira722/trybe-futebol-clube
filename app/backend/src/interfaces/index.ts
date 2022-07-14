export interface IUser {
  username: string;
  email: string;
  role: string;
  password: string;
}

export type IUserLogin = Omit<IUser, 'role' | 'username'>; 
