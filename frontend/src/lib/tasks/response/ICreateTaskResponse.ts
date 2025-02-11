import { Task } from "@/types/Task"

export type ICreateTaskResponse = {
    success: boolean
    task: Task;
}