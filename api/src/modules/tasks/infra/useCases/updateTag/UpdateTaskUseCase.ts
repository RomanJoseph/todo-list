import { inject, injectable } from 'tsyringe';
import TaskRepository from '../../typeorm/repositories/TaskRepository';
import ErrorsApp from '@shared/errors/ErrorsApp';
import { Task } from '../../typeorm/entities/Task';
import { ICreateTaskDTO } from '@modules/tasks/dtos/ICreateTaskDTO';

@injectable()
export class UpdateTaskUseCase {
  constructor(
    @inject(TaskRepository) private readonly taskRepository: TaskRepository,
  ) {}

  public async execute(
    user_id: string,
    task_id: string,
    data: Partial<ICreateTaskDTO>,
  ): Promise<Task> {
    const task = await this.taskRepository.findById(task_id);

    if (!task) throw new ErrorsApp('Registro não encontrado!', 404);

    const canUserUpdateTask = task.user_id === user_id;

    if (!canUserUpdateTask)
      throw new ErrorsApp('Usuário não pode deletar essa tarefa!', 401);

    return this.taskRepository.save(Object.assign(task, data));
  }
}
