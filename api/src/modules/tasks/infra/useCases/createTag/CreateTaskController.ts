import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateTaskUseCase } from './CreateTaskUseCase';

class CreateTaskController {
  async handle(request: Request, response: Response): Promise<void> {
    const data = request.body;
    const { id: user_id } = request.user;

    try {
      const createTaskUseCase = container.resolve(CreateTaskUseCase)
      const task = await createTaskUseCase.execute({...data, user_id });

      response.status(201).json({ success: true, task });
    } catch (err) {
      response
        .status(err.statusCode)
        .json({ success: false, message: err.message });
    }
  }
}
export default CreateTaskController;
