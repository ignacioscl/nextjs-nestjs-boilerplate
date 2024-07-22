
import { Repository } from 'typeorm'
import { PaginationDto } from '../dto/pagination.dto';

export abstract class BaseRepository<T extends {}, R extends { id?: number }> extends Repository<T> {
  abstract fetch(payload: R): Promise<PaginationDto<T>>
}
