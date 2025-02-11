import { inject, injectable } from 'tsyringe';
import {
  DataSource,
  EntityTarget,
  FindOptionsWhere,
  In,
  Repository,
} from 'typeorm';

import { PrimaryEntity } from './PrimaryEntity';

@injectable()
export class PrimaryRepository<T extends PrimaryEntity> extends Repository<T> {
  constructor(
    @inject('DATA_SOURCE_SQL') dataSource: DataSource,
    private readonly entity: EntityTarget<T>,
  ) {
    super(entity, dataSource.createEntityManager());
  }

  public async findById(id: string): Promise<T | undefined> {
    return this.findOne({
      where: { id } as FindOptionsWhere<T>,
    });
  }
}
