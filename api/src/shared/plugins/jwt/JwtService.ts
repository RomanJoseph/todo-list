import authConfig from '@config/auth';
import jwt from 'jsonwebtoken';

export interface IJwtPayload {
  id: string;
}

export interface ITokenPayload {
  iat: number;
  exp: number;
  id: string;
}

export class JwtService {
  public async generateToken(payloads: IJwtPayload): Promise<string> {
    const { secret, expiresIn } = authConfig.jwt;

    const token = await jwt.sign(payloads, secret, { expiresIn });

    return token;
  }

  public async verifyToken(token: string): Promise<ITokenPayload> {
    const decoded = await jwt.verify(token, authConfig.jwt.secret);

    return decoded as ITokenPayload;
  }
}
