import { IUserLogin, IUserModel, IUserService } from '../interfaces';
import JWT from '../helpers/jwt';
import HttpException from '../middlewares/HttpExceptions';

export default class LoginService implements IUserService {
  constructor(private model: IUserModel) {
    this.model = model;
  }

  async login(data: IUserLogin): Promise<string> {
    const [user] = await this.model.findAll(data);
    if (!user) {
      throw new HttpException(401, 'Incorrect email or password');
    }
    const userGenerateToken = {
      email: user.email,
      password: user.password,
    };
    const newToken = JWT.generateToken(userGenerateToken);
    return newToken;
  }
}
