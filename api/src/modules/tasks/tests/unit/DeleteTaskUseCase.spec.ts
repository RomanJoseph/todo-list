import 'reflect-metadata';
import { DeleteTaskUseCase } from '@modules/tasks/infra/useCases/deleteTag/DeleteTaskUseCase';
import TaskRepository from '@modules/tasks/infra/typeorm/repositories/TaskRepository';
import ErrorsApp from '@shared/errors/ErrorsApp';

describe('DeleteTaskUseCase', () => {
  let taskRepositoryMock: Partial<TaskRepository>;
  let deleteTaskUseCase: DeleteTaskUseCase;

  beforeEach(() => {
    taskRepositoryMock = {
      findById: jest.fn(),
      remove: jest.fn(),
    };
    deleteTaskUseCase = new DeleteTaskUseCase(taskRepositoryMock as TaskRepository);
  });

  it('deve deletar a task se o usuário for dono', async () => {
    (taskRepositoryMock.findById as jest.Mock).mockResolvedValue({
      id: 'task-id',
      user_id: 'user-id',
    });

    const removeSpy = jest.spyOn(taskRepositoryMock, 'remove');

    await deleteTaskUseCase.execute('user-id', 'task-id');

    expect(removeSpy).toHaveBeenCalled();
  });

  it('deve lançar erro se a task não existir', async () => {
    (taskRepositoryMock.findById as jest.Mock).mockResolvedValue(undefined);

    await expect(deleteTaskUseCase.execute('user-id', 'task-id')).rejects.toBeInstanceOf(ErrorsApp);
  });

  it('deve lançar erro se o usuário não for dono da task', async () => {
    (taskRepositoryMock.findById as jest.Mock).mockResolvedValue({
      id: 'task-id',
      user_id: 'another-user',
    });

    await expect(deleteTaskUseCase.execute('user-id', 'task-id')).rejects.toBeInstanceOf(ErrorsApp);
  });
});