import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ShowTaskUseCase } from './ShowTaskUseCase';

class ShowTaskController {
  async handle(request: Request, response: Response): Promise<void> {
    const { id: task_id } = request.params;
    const { id: user_id } = request.user;

    try {
      const showTaskUseCase = container.resolve(ShowTaskUseCase);

      const task = await showTaskUseCase.execute(task_id, user_id);

      response.json({ success: true, task });
    } catch (err) {
      response
        .status(err.statusCode)
        .json({ success: false, message: err.message });
    }
  }
}
export default ShowTaskController;
