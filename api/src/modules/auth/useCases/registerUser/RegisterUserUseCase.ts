import { IRegisterUserDTO } from "@modules/auth/dtos/IRegisterUserDTO";
import { User } from "@modules/users/infra/typeorm/entities/User";
import UserRepository from "@modules/users/infra/typeorm/repositories/UserRepository";
import ErrorsApp from "@shared/errors/ErrorsApp";
import { EncryptService } from "@shared/plugins/encrypt/EncryptService";
import { IEncryptService } from "@shared/plugins/encrypt/IEncryptService";
import { inject, injectable } from "tsyringe";

@injectable()
export class RegisterUserUseCase {
    constructor(
        @inject(UserRepository) private readonly userRepository: UserRepository,
        @inject(EncryptService) private readonly encryptService: IEncryptService
    ) {}

    public async execute(data: IRegisterUserDTO): Promise<User> {
        const user = await this.userRepository.findByLogin(data.email);

        if(user) {
            throw new ErrorsApp('Já existe um usuário cadastrado com esse email!', 409);
        }

        const newUser = new User();

        newUser.email = data.email;
        newUser.name = data.name;
        newUser.password = await this.encryptService.encryptPassword(data.password);

        return this.userRepository.save(newUser);
    }
}