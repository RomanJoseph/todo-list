import { ICreateTaskDTO } from "@modules/tasks/dtos/ICreateTaskDTO";
import { inject, injectable } from "tsyringe";
import { Task } from "../../typeorm/entities/Task";
import TaskRepository from "../../typeorm/repositories/TaskRepository";

@injectable()
export class CreateTaskUseCase {
    constructor(
        @inject(TaskRepository) private readonly taskRepository: TaskRepository
    ) {}

    public async execute(data: ICreateTaskDTO): Promise<Task> {
        return this.taskRepository.save(Object.assign(new Task(), data));
    }
}