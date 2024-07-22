import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

import { PaginationDto, RequestPaginationDto } from '../../../commons/dto/pagination.dto'
import { Template } from '../entity/template'

export class TemplateDto extends OmitType(Template, ['id', 'createdAt', 'deletedAt', 'updatedAt'] as const) {}

export class UpdateTemplateDto extends PartialType(TemplateDto) {}

export class TemplateQueryDto extends RequestPaginationDto {
  @ApiProperty({ description: 'Dummy filter', required: false })
  @IsString()
  @IsOptional()
  id?: number
}

export class TemplatePaginationDto extends PaginationDto<Template> {
  @ApiProperty({ type: Template, isArray: true })
  data: Template[]
}
