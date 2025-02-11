import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<void> {
    const { email, password } = request.body;
    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    try {
      const user = await authenticateUserUseCase.execute({
        email,
        password,
      });

      response.json({ token: user.token, user: user.user });
    } catch (err) {
      response.status(400).json({ success: false, message: err.message });
    }
  }
}
