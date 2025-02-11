import { TaskStatusEnum } from "./enums/TaskStatusEnum";

export type Task = {
    id: string;
    created_at: Date;
    updated_at: Date;
} & TaskCreate;

export type TaskCreate = {
    title: string;
    status: TaskStatusEnum;
    description?: string;
}