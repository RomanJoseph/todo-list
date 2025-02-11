import { inject, injectable } from "tsyringe";
import TaskRepository from "../../typeorm/repositories/TaskRepository";
import UserRepository from "@modules/users/infra/typeorm/repositories/UserRepository";
import ErrorsApp from "@shared/errors/ErrorsApp";
import { Task } from "../../typeorm/entities/Task";

@injectable()
export class ShowTaskUseCase {
    constructor(
        @inject(TaskRepository) private readonly taskRepository: TaskRepository,
        @inject(UserRepository) private readonly userRepository: UserRepository
    ) {}

    public async execute(task_id: string, user_id: string): Promise<Task> {
        const task = await this.taskRepository.findById(task_id);

        if (!task) throw new ErrorsApp('Registro não encontrado!', 404);

        const canUserGeteTask = task.user_id === user_id;
    
        if (!canUserGeteTask)
          throw new ErrorsApp('Usuário não pode deletar essa tarefa!', 401);    
    
        return task;   
    }
}