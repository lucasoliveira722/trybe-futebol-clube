import { IUserLogin, IUserModel, IUserService } from '../interfaces';
import JWT from '../helpers/jwt';

export default class LoginService implements IUserService {
  constructor(private model: IUserModel) {
    this.model = model;
  }

  async login(data: IUserLogin): Promise<string> {
    const [user] = await this.model.findAll(data);
    // const { email, password } = user as IUserLogin;
    const userGenerateToken = {
      email: user.email,
      password: user.password,
    };
    const newToken = JWT.generateToken(userGenerateToken);
    return newToken;
  }
}
