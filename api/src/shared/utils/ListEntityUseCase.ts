import { IFilterQuery } from '@shared/helpers/filter/typeorm/FilterBuilder';
import { PrimaryEntity } from '@shared/infra/typeorm/PrimaryEntity';
import { PrimaryRepository } from '@shared/infra/typeorm/PrimaryRepository';
import { inject, injectable } from 'tsyringe';

export interface IResponse<T> {
  total: number;
  total_page: number;
  result: T[];
}

@injectable()
class ListEntityUseCase<T extends PrimaryEntity> {
  constructor(
    @inject(PrimaryRepository) private readonly repository: PrimaryRepository<T>,
  ) {}

  public async execute(query: IFilterQuery): Promise<IResponse<T>> {
    const [result, total] = await this.repository.findAll(query);

    const response: IResponse<T> = {
      result,
      total,
      total_page: Math.ceil(total / query.per_page),
    };

    return response;
  }
}

export default ListEntityUseCase;
