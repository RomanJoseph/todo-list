import { api } from "../api";
import { IFindTaskResponse } from "./response/IFindTaskResponse";
import { ICreateTaskRequest } from "./request/ICreateTaskRequest";
import { ICreateTaskResponse } from "./response/ICreateTaskResponse";

export const listTasks = async (): Promise<IFindTaskResponse> => {
  const response = await api.get<IFindTaskResponse>('/task');
  return response.data;
};

export const createTask = async (data: ICreateTaskRequest): Promise<ICreateTaskResponse> => {
  const response = await api.post<ICreateTaskResponse>('/task', data);
  return response.data;
};

export const updateTask = async (
  id: string,
  data: Partial<ICreateTaskRequest>
): Promise<ICreateTaskRequest> => {
  const response = await api.put<ICreateTaskRequest>(`/task/${id}`, data);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/task/${id}`);
};

export const getTaskById = async (id: string): Promise<IFindTaskResponse> => {
  const response = await api.get<IFindTaskResponse>(`/task/${id}`);
  return response.data;
};
