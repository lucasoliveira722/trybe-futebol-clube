import User from '../database/models/User.models';
import { IUser, IUserModel, IUserLogin } from '../interfaces';

export default class UserRepository implements IUserModel {
  constructor(private model = User) {
    this.model = model;
  }

  async findAll(data: IUserLogin): Promise<IUser[]> {
    const login = await this.model.findAll({
      where: {
        email: data.email,
      },
    });
    return login;
  }
}

// testar findOne
