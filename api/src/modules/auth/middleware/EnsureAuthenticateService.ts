import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import ErrorsApp from '@shared/errors/ErrorsApp';
import { JwtService } from '@shared/plugins/jwt/JwtService';
import { NextFunction, Request, Response } from 'express';
import { container, injectable } from 'tsyringe';

@injectable()
export class EnsureAuthenticateService {
  public async execute(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    const jwtService = container.resolve(JwtService);
    const userRepository = container.resolve(UserRepository);

    const header = request.headers.authorization;

    if (!header) {
      throw new ErrorsApp('JWT Token not found!', 401);
    }

    const [, token] = header.split(' ');

    const { id: user_id } = await jwtService.verifyToken(token);

    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new ErrorsApp('Usuário não existe!', 401);
    }

    request.user = {
      id: user_id,
    };

    return next();
  }
}
