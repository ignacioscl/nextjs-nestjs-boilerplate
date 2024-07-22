import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Template } from '../entity/template'
import { BaseRepository } from 'src/commons/repository/base.repository'
import { TemplatePaginationDto, TemplateQueryDto } from '../dto/template'
import { PaginationDto } from 'src/commons/dto/pagination.dto'


@Injectable()
export class TemplateRepository extends BaseRepository<Template, TemplateQueryDto> {
  constructor(@InjectRepository(Template) private readonly _: Repository<Template>) {
    super(_.target, _.manager, _.queryRunner)
  }
  public async fetch(payload: TemplateQueryDto): Promise<PaginationDto<Template>> {
    const { page, pageSize } = payload
    const pageNumber = page ?? 0
    const take = pageSize ?? 10
    const skip = Math.max(0, pageNumber) * take

    const query = this.createQueryBuilder('aliasEntity')


    if (payload.id){
      query.andWhere('aliasEntity.id = :id', { id: payload.id })
    }
    if (payload.includeDeleted==1) {
      query.withDeleted();
    }
    if (payload.hasDeleted==1) {
      query.withDeleted();
      query.andWhere('aliasEntity.deletedAt IS NOT NULL')
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
