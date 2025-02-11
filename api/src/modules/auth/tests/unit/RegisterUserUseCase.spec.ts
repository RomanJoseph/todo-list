import 'reflect-metadata';
import { RegisterUserUseCase } from '@modules/auth/useCases/registerUser/RegisterUserUseCase';
import ErrorsApp from '@shared/errors/ErrorsApp';
import { IEncryptService } from '@shared/plugins/encrypt/IEncryptService';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import { User } from '@modules/users/infra/typeorm/entities/User';

describe('RegisterUserUseCase', () => {
  let userRepositoryMock: Partial<UserRepository>;
  let encryptServiceMock: Partial<IEncryptService>;
  let registerUserUseCase: RegisterUserUseCase;

  beforeEach(() => {
    userRepositoryMock = {
      findByLogin: jest.fn(),
      save: jest.fn(),
    };

    encryptServiceMock = {
      encryptPassword: jest.fn(),
      comparePassword: jest.fn(),
    };

    registerUserUseCase = new RegisterUserUseCase(
      userRepositoryMock as UserRepository,
      encryptServiceMock as IEncryptService,
    );
  });

  it('deve registrar um novo usuário com sucesso', async () => {
    // Arrange
    (userRepositoryMock.findByLogin as jest.Mock).mockResolvedValue(undefined);
    (encryptServiceMock.encryptPassword as jest.Mock).mockResolvedValue('hashedPass');
    (userRepositoryMock.save as jest.Mock).mockImplementation(async (user: User) => {
      user.id = 'user-id-test';
      return user;
    });

    // Act
    const user = await registerUserUseCase.execute({
      email: 'test@example.com',
      password: '123456',
      name: 'Test User',
    });

    // Assert
    expect(userRepositoryMock.findByLogin).toHaveBeenCalledWith('test@example.com');
    expect(encryptServiceMock.encryptPassword).toHaveBeenCalledWith('123456');
    expect(userRepositoryMock.save).toHaveBeenCalled();
    expect(user.id).toBe('user-id-test');
    expect(user.password).toBe('hashedPass');
  });

  it('deve lançar erro se o email já estiver cadastrado', async () => {
    (userRepositoryMock.findByLogin as jest.Mock).mockResolvedValue({ id: 'existing-id' });

    await expect(
      registerUserUseCase.execute({
        email: 'test@example.com',
        password: '123456',
        name: 'Test User',
      })
    ).rejects.toBeInstanceOf(ErrorsApp);

    expect(userRepositoryMock.save).not.toHaveBeenCalled();
  });
});
