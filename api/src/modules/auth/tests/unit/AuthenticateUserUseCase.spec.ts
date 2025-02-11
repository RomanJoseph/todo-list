import 'reflect-metadata';
import { AuthenticateUserUseCase } from '@modules/auth/useCases/authenticateUser/AuthenticateUserUseCase';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import { IEncryptService } from '@shared/plugins/encrypt/IEncryptService';
import { IJwtService } from '@shared/plugins/jwt/IJwtService';
import ErrorsApp from '@shared/errors/ErrorsApp';

describe('AuthenticateUserUseCase', () => {
  let userRepositoryMock: Partial<UserRepository>;
  let encryptServiceMock: Partial<IEncryptService>;
  let jwtServiceMock: Partial<IJwtService>;
  let authenticateUserUseCase: AuthenticateUserUseCase;

  beforeEach(() => {
    userRepositoryMock = {
      findByLogin: jest.fn(),
    };

    encryptServiceMock = {
      comparePassword: jest.fn(),
    };

    jwtServiceMock = {
      generateToken: jest.fn(),
      verifyToken: jest.fn(),
    };

    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryMock as UserRepository,
      jwtServiceMock as IJwtService,
      encryptServiceMock as IEncryptService,
    );
  });

  it('deve autenticar e retornar token se as credenciais estiverem corretas', async () => {
    (userRepositoryMock.findByLogin as jest.Mock).mockResolvedValue({
      id: 'user-id',
      email: 'test@example.com',
      password: 'hashedPassword',
    });

    (encryptServiceMock.comparePassword as jest.Mock).mockResolvedValue(true);
    (jwtServiceMock.generateToken as jest.Mock).mockResolvedValue('fake-token');

    const result = await authenticateUserUseCase.execute({
      email: 'test@example.com',
      password: '123456',
    });

    expect(userRepositoryMock.findByLogin).toHaveBeenCalledWith('test@example.com');
    expect(encryptServiceMock.comparePassword).toHaveBeenCalledWith('123456', 'hashedPassword');
    expect(jwtServiceMock.generateToken).toHaveBeenCalledWith({ id: 'user-id' });
    expect(result).toHaveProperty('token', 'fake-token');
    expect(result).toHaveProperty('user');
  });

  it('deve falhar se o usuário não existir', async () => {
    (userRepositoryMock.findByLogin as jest.Mock).mockResolvedValue(undefined);

    await expect(
      authenticateUserUseCase.execute({
        email: 'test@example.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(ErrorsApp);
  });

  it('deve falhar se a senha estiver incorreta', async () => {
    (userRepositoryMock.findByLogin as jest.Mock).mockResolvedValue({
      id: 'user-id',
      password: 'hashedPassword',
    });
    (encryptServiceMock.comparePassword as jest.Mock).mockResolvedValue(false);

    await expect(
      authenticateUserUseCase.execute({
        email: 'test@example.com',
        password: 'wrong',
      })
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
