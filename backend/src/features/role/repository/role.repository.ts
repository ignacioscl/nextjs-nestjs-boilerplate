import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Role } from '../entity/role.entity'
import { BaseRepository } from 'src/commons/repository/base.repository'
import { RolePaginationDto, RoleQueryDto } from '../dto/role.dto'
import { PaginationDto } from 'src/commons/dto/pagination.dto'


@Injectable()
export class RoleRepository extends BaseRepository<Role, RoleQueryDto> {
  constructor(@InjectRepository(Role) private readonly _: Repository<Role>) {
    super(_.target, _.manager, _.queryRunner)
  }
  public async fetch(payload: RoleQueryDto): Promise<PaginationDto<Role>> {
    const { page, pageSize } = payload
    const pageNumber = page ?? 0
    const take = pageSize ?? 10
    const skip = Math.max(0, pageNumber) * take

    const query = this.createQueryBuilder('role')


    if (payload.id){
      query.andWhere('role.id = :id', { id: payload.id })
    }
    if (payload.includeDeleted==1) {
      query.withDeleted();
    }
    if (payload.hasDeleted==1) {
      query.withDeleted();
      query.andWhere('role.deletedAt IS NOT NULL')
    }
    if (payload.orderBy && payload.orderBy.length > 0) {
      payload.orderBy.forEach(o => {
        query.orderBy(o.value, o.order)
      })
    }
    const [data, total] = await query.take(take).skip(skip).getManyAndCount()

    return new PaginationDto({
      data,
      page,
      pageSize: take,
      lastPage: total ? Math.ceil(total / take) - 1 : 0,
      total,
    })
  }
}
