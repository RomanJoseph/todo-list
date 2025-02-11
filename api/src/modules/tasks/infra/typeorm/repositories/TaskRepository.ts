import { inject, injectable } from 'tsyringe';
import { DataSource, FindOptionsWhere } from 'typeorm';

import { PrimaryRepository } from '../../../../../shared/infra/typeorm/PrimaryRepository';
import { Task } from '../entities/Task';

@injectable()
class TaskRepository extends PrimaryRepository<Task> {
  constructor(@inject('DATA_SOURCE_SQL') dataSource: DataSource) {
    super(dataSource, Task);
  }

  public async findByUserId(user_id:string): Promise<Task[]> {
    return this.find({
      where: {
        user_id
      }
    })
  }
}

export default TaskRepository;
