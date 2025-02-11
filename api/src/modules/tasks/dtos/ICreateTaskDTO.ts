import { TaskStatusEnum } from "../enum/TaskStatusEnum";

export interface ICreateTaskDTO {
    user_id: string;
    title: string;
    description: string;
    status: TaskStatusEnum;
}