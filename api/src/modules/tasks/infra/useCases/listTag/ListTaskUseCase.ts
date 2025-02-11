import { inject, injectable } from "tsyringe";
import TaskRepository from "../../typeorm/repositories/TaskRepository";
import { Task } from "../../typeorm/entities/Task";

@injectable()
export class ListTaskUseCase {
    constructor(
        @inject(TaskRepository) private readonly taskRepository: TaskRepository
    ) {}

    public async execute(user_id: string): Promise<Task[]> {
        return this.taskRepository.findByUserId(user_id);
    }
}