import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

import { PaginationDto, RequestPaginationDto } from '../../../commons/dto/pagination.dto'
import { Role } from '../entity/role.entity'

export class RoleDto extends OmitType(Role, ['id', 'createdAt', 'deletedAt', 'updatedAt'] as const) {}

export class UpdateRoleDto extends PartialType(RoleDto) {}

export class RoleQueryDto extends RequestPaginationDto {
  @ApiProperty({ description: 'Dummy filter', required: false })
  @IsString()
  @IsOptional()
  id?: number
}

export class RolePaginationDto extends PaginationDto<Role> {
  @ApiProperty({ type: Role, isArray: true })
  data: Role[]
}
