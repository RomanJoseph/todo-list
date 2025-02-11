import { inject, injectable } from "tsyringe";
import TaskRepository from "../../typeorm/repositories/TaskRepository";
import ErrorsApp from "@shared/errors/ErrorsApp";

@injectable()
export class DeleteTaskUseCase {
    constructor(
        @inject(TaskRepository) private readonly taskRepository: TaskRepository,
    ) {}

    public async execute(user_id: string, task_id: string): Promise<void> {
        const task = await this.taskRepository.findById(task_id);

        if (!task) throw new ErrorsApp('Registro não encontrado!', 404);

        const canUserDeleteTask = task.user_id === user_id;

        if(!canUserDeleteTask) throw new ErrorsApp('Usuário não pode deletar essa tarefa!', 401);

        await this.taskRepository.remove(task);
    }
}