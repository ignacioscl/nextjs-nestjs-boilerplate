import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Length } from 'class-validator';
import { EntityBase } from 'src/commons/entity/entity-base';

@Entity('role')
export class Role extends EntityBase{



  @Column({ type: 'varchar', length: 80 })
  @ApiProperty({ example: 'Admin', description: 'The description of the role.' })
  @IsString()
  @Length(1, 80)
  description: string;
}
