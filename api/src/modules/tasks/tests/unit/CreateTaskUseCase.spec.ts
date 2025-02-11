import 'reflect-metadata';
import { CreateTaskUseCase } from '@modules/tasks/infra/useCases/createTag/CreateTaskUseCase';
import TaskRepository from '@modules/tasks/infra/typeorm/repositories/TaskRepository';
import { Task } from '@modules/tasks/infra/typeorm/entities/Task';
import { TaskStatusEnum } from '@modules/tasks/enum/TaskStatusEnum';

describe('CreateTaskUseCase', () => {
  let taskRepositoryMock: Partial<TaskRepository>;
  let createTaskUseCase: CreateTaskUseCase;

  beforeEach(() => {
    taskRepositoryMock = {
      save: jest.fn(),
    };
    createTaskUseCase = new CreateTaskUseCase(taskRepositoryMock as TaskRepository);
  });

  it('deve criar uma task e retornar o objeto criado', async () => {
    (taskRepositoryMock.save as jest.Mock).mockImplementation(async (task: Task) => {
      task.id = 'task-id';
      return task;
    });

    const result = await createTaskUseCase.execute({
      user_id: 'user-id',
      title: 'Nova Task',
      description: 'Descrição da Task',
      status: TaskStatusEnum.PENDING,
    });

    expect(taskRepositoryMock.save).toHaveBeenCalled();
    expect(result).toHaveProperty('id', 'task-id');
    expect(result.user_id).toBe('user-id');
  });
});
