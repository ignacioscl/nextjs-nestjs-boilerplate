import { Inject, Injectable } from '@nestjs/common'

import { Role } from '../entity/role.entity'
import { RoleRepository } from '../repository/role.repository'
import { GlobalBaseService } from 'src/commons/service/global.base.service'
import { RoleQueryDto } from '../dto/role.dto'

@Injectable()
export class RoleService extends GlobalBaseService<Role, RoleQueryDto> {
  constructor(@Inject(RoleRepository) private readonly repository: RoleRepository) {
    super()
  }
//test
  protected getRepository(): RoleRepository {
    return this.repository
  }
}
