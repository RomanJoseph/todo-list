import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RegisterUserUseCase } from './RegisterUserUseCase';
import { instanceToInstance } from 'class-transformer';

export class RegisterUserController {
  async handle(request: Request, response: Response): Promise<void> {
    const { email, name, password } = request.body;
    const registerUserUseCase = container.resolve(RegisterUserUseCase);

    try {
      const user = await registerUserUseCase.execute({
        email,
        password,
        name
      });

      response.json({ success: true, user: instanceToInstance(user) });
    } catch (err) {
      response.status(400).json({ success: false, message: err.message });
    }
  }
}
