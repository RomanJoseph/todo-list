import { User } from '@modules/users/infra/typeorm/entities/User';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import ErrorsApp from '@shared/errors/ErrorsApp';
import { EncryptService } from '@shared/plugins/encrypt/EncryptService';
import { IEncryptService } from '@shared/plugins/encrypt/IEncryptService';
import { IJwtService } from '@shared/plugins/jwt/IJwtService';
import { JwtService } from '@shared/plugins/jwt/JwtService';
import { instanceToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  email: string;
  password: string;
}

interface IExecuteResponse {
  user: User;
  token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject(UserRepository)
    private readonly userRepository: UserRepository,

    @inject(JwtService)
    private readonly jwtService: IJwtService,

    @inject(EncryptService)
    private readonly encryptService: IEncryptService,
  ) {}

  async execute(data: IRequest): Promise<IExecuteResponse> {
    const user = await this.userRepository.findByLogin(data.email);



    if (!user) {
      throw new ErrorsApp('Usuário ou senha incorreto!', 401);
    }

    const passwordMatched = await this.encryptService.comparePassword(
      data.password,
      user.password,
    );

    if (!passwordMatched) {
      throw new ErrorsApp('Usuário ou senha incorreto!', 401);
    }

    const token = await this.jwtService.generateToken({ id: user.id });

    return { user: instanceToInstance(user), token };
  }
}
