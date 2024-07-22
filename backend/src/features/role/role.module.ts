import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RoleController } from './controller/role.controller'
import { Role } from './entity/role.entity'
import { RoleRepository } from './repository/role.repository'
import { RoleService } from './service/role.service'

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RoleRepository, RoleService],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}
