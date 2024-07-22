import { Inject, Injectable } from '@nestjs/common'

import { Template } from '../entity/template'
import { TemplateRepository } from '../repository/template'
import { GlobalBaseService } from 'src/commons/service/global.base.service'
import { TemplateQueryDto } from '../dto/template'

@Injectable()
export class TemplateService extends GlobalBaseService<Template, TemplateQueryDto> {
  constructor(@Inject(TemplateRepository) private readonly repository: TemplateRepository) {
    super()
  }
//test
  protected getRepository(): TemplateRepository {
    return this.repository
  }
}
