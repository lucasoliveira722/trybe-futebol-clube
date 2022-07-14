import { sign, SignOptions, verify } from 'jsonwebtoken';

export default class JWT {
  // private jwtSecret = (process.env.JWT_SECRET);
  private static token: string;
  private static jwtSecret = 'jwt_secret';
  private static options: SignOptions = {
    expiresIn: '5d',
    algorithm: 'HS256',
  };

  static generateToken(user: object): string {
    this.token = sign(user, this.jwtSecret, this.options)
    return this.token;
  }

  static validateToken(token: string) {
    try {
      const result = verify(token, this.jwtSecret);
      return result;
    } catch (error) {
      return null;
    }
  }
}