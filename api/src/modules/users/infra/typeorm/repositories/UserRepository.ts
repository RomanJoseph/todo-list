import { inject, injectable } from 'tsyringe';
import { DataSource, FindOptionsWhere } from 'typeorm';

import { PrimaryRepository } from '../../../../../shared/infra/typeorm/PrimaryRepository';
import { User } from '../entities/User';

@injectable()
class UserRepository extends PrimaryRepository<User> {
  constructor(@inject('DATA_SOURCE_SQL') dataSource: DataSource) {
    super(dataSource, User);
  }

  public async findByLogin(login: string): Promise<User | undefined> {
    return this.findOne({
      where: { email: login },
    });
  }
}

export default UserRepository;
