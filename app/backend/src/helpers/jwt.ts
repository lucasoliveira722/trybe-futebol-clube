import { sign, SignOptions } from 'jsonwebtoken';
// import { IUserLogin } from '../interfaces';

export default class JWT {
  private static jwtSecret = String(process.env.JWT_SECRET);
  private static token: string;
  private static options: SignOptions = {
    expiresIn: '5d',
    algorithm: 'HS256',
  };

  static generateToken(user: object): string {
    this.token = sign(user, this.jwtSecret, this.options);
    return this.token;
  }

  // static validateToken(token: string) {
  //   try {
  //     const result = verify(token, this.jwtSecret);
  //     return result;
  //   } catch (error) {
  //     return null;
  //   }
  // }
}
// Uso do String(env) tirado de https://dev.to/vitordelfino/autenticacao-com-jwt-22o7
