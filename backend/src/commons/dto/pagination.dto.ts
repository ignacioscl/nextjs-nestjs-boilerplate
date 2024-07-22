import { ApiProperty, OmitType } from '@nestjs/swagger'
import { IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class PaginationDto<T> {
  constructor(values?: Partial<PaginationDto<T>>) {
    Object.assign(this, values)
  }

  @ApiProperty({ description: 'Data', isArray: true })
  data: T[]

  @ApiProperty({ description: 'Current page', required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  page: number

  @ApiProperty({ description: 'Page size', required: false })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  pageSize: number

  @ApiProperty({ description: 'Total', required: false })
  @IsNumber()
  @Type(() => Number)
  total: number

  @ApiProperty({ description: 'Last page', required: false })
  @IsNumber()
  @Type(() => Number)
  lastPage: number

  @ApiProperty({ description: 'Next page (endpoint)', required: false })
  @IsString()
  next: string

  @ApiProperty({ description: 'Previous page (endpoint)', required: false })
  @IsString()
  previous: string

  @ApiProperty({
    description: 'Order by fields',
    required: false,
    example: { fieldName1: 'asc', fieldName2: 'desc' },
  })
  @IsOptional()
  orderBy?: [{ value: string; order: 'ASC' | 'DESC' }]

  @ApiProperty({
    description: 'Incluye eliminados',
    required: false,
    example: 1,
  })
  @IsIn(["0","1",1,0])
  @IsOptional()
  includeDeleted?: 0|1;

  @ApiProperty({
    description: 'solo eliminados eliminados',
    required: false,
    example: 1,
  })
  @IsIn(["0","1",1,0])
  @IsOptional()
  hasDeleted?: 0|1;
}

export class RequestPaginationDto extends OmitType(PaginationDto, [
  'data',
  'lastPage',
  'total',
  'next',
  'previous',
] as const) {}
