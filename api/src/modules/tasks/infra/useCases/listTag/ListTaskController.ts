import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListTaskUseCase } from './ListTaskUseCase';

class ListTaskController {
  async handle(request: Request, response: Response): Promise<void> {
    const { id: user_id } = request.user;

    try {
      const listTaskUseCase = container.resolve(ListTaskUseCase);

      const tasks = await listTaskUseCase.execute(user_id);

      response.json({ success: true, tasks: instanceToInstance(tasks) });
    } catch (err) {
      response
        .status(err.statusCode)
        .json({ success: false, message: err.message });
    }
  }
}
export default ListTaskController;
