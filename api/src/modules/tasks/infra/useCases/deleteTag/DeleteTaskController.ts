import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteTaskUseCase } from './DeleteTaskUseCase';

class DeleteTaskController {
  async handle(request: Request, response: Response): Promise<void> {
    const { id: task_id } = request.params;
    const { id: user_id } = request.user;

    try {
      const deleteTaskUseCase = container.resolve(DeleteTaskUseCase);

      await deleteTaskUseCase.execute(user_id, task_id);

      response.status(204).send();
    } catch (err) {
      console.log(err);
      response
        .status(err.statusCode)
        .json({ success: false, message: err.message });
    }
  }
}
export default DeleteTaskController;
