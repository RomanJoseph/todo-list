import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateTaskUseCase } from './UpdateTaskUseCase';

class UpdateTaskController {
  async handle(request: Request, response: Response): Promise<void> {
    const { id: task_id } = request.params;
    const { id: user_id } = request.user;
    const data = request.body;

    try {
      const updateTaskUseCase = container.resolve(UpdateTaskUseCase);

      const task = await updateTaskUseCase.execute(user_id, task_id, data);

      response.json({ success: true, task: instanceToInstance(task) });
    } catch (err) {
      response
        .status(err.statusCode)
        .json({ success: false, message: err.message });
    }
  }
}

export default UpdateTaskController;
