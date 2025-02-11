import 'reflect-metadata';
import { UpdateTaskUseCase } from '@modules/tasks/infra/useCases/updateTag/UpdateTaskUseCase';
import TaskRepository from '@modules/tasks/infra/typeorm/repositories/TaskRepository';
import ErrorsApp from '@shared/errors/ErrorsApp';

describe('UpdateTaskUseCase', () => {
  let taskRepositoryMock: Partial<TaskRepository>;
  let updateTaskUseCase: UpdateTaskUseCase;

  beforeEach(() => {
    taskRepositoryMock = {
      findById: jest.fn(),
      save: jest.fn(),
    };
    updateTaskUseCase = new UpdateTaskUseCase(taskRepositoryMock as TaskRepository);
  });

  it('deve atualizar a task se o usuário for o dono', async () => {
    (taskRepositoryMock.findById as jest.Mock).mockResolvedValue({
      id: 'task-id',
      user_id: 'user-id',
      title: 'Old Title',
    });

    (taskRepositoryMock.save as jest.Mock).mockImplementation(async updatedTask => updatedTask);

    const result = await updateTaskUseCase.execute('user-id', 'task-id', {
      title: 'New Title',
    });

    expect(result.title).toBe('New Title');
    expect(taskRepositoryMock.save).toHaveBeenCalled();
  });

  it('deve lançar erro se a task não existir', async () => {
    (taskRepositoryMock.findById as jest.Mock).mockResolvedValue(undefined);

    await expect(
      updateTaskUseCase.execute('user-id', 'task-id', { title: 'any' }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });

  it('deve lançar erro se o usuário não for dono da task', async () => {
    (taskRepositoryMock.findById as jest.Mock).mockResolvedValue({
      id: 'task-id',
      user_id: 'another-user',
    });

    await expect(
      updateTaskUseCase.execute('user-id', 'task-id', { title: 'any' }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});