import 'reflect-metadata';
import { container } from 'tsyringe';

import { PrimaryRepository } from '../infra/typeorm/PrimaryRepository';
import { PostgresDataSource } from '@shared/infra/typeorm/postgresOrmConfig';
import TaskRepository from '@modules/tasks/infra/typeorm/repositories/TaskRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

container.register('DATA_SOURCE_SQL', {
  useValue: PostgresDataSource,
});

container.registerSingleton(PrimaryRepository);

container.registerSingleton<UserRepository>(UserRepository);
container.resolve<TaskRepository>(TaskRepository)