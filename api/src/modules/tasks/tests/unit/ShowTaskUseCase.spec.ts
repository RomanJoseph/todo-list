import 'reflect-metadata';
import { ShowTaskUseCase } from '@modules/tasks/infra/useCases/showTag/ShowTaskUseCase';
import TaskRepository from '@modules/tasks/infra/typeorm/repositories/TaskRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import ErrorsApp from '@shared/errors/ErrorsApp';

describe('ShowTaskUseCase', () => {
  let taskRepositoryMock: Partial<TaskRepository>;
  let userRepositoryMock: Partial<UserRepository>;
  let showTaskUseCase: ShowTaskUseCase;

  beforeEach(() => {
    taskRepositoryMock = {
      findById: jest.fn(),
    };
    userRepositoryMock = {};
    showTaskUseCase = new ShowTaskUseCase(
      taskRepositoryMock as TaskRepository,
      userRepositoryMock as UserRepository,
    );
  });

  it('deve retornar a task se ela existir e pertencer ao usuário', async () => {
    (taskRepositoryMock.findById as jest.Mock).mockResolvedValue({
      id: 'task-id',
      user_id: 'user-id',
      title: 'Minha Task',
    });

    const task = await showTaskUseCase.execute('task-id', 'user-id');

    expect(taskRepositoryMock.findById).toHaveBeenCalledWith('task-id');
    expect(task.id).toBe('task-id');
  });

  it('deve lançar erro se a task não existir', async () => {
    (taskRepositoryMock.findById as jest.Mock).mockResolvedValue(undefined);

    await expect(showTaskUseCase.execute('invalid-id', 'user-id')).rejects.toBeInstanceOf(ErrorsApp);
  });

  it('deve lançar erro se a task pertencer a outro usuário', async () => {
    (taskRepositoryMock.findById as jest.Mock).mockResolvedValue({
      id: 'task-id',
      user_id: 'another-user-id',
    });

    await expect(showTaskUseCase.execute('task-id', 'user-id')).rejects.toBeInstanceOf(ErrorsApp);
  });
});