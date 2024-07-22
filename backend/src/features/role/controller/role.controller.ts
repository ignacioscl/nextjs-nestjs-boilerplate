import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'

import { IdParams } from '../../../commons/dto/commons.dto'

import { RoleService } from '../service/role.service'
import { RoleDto, RolePaginationDto, RoleQueryDto, UpdateRoleDto } from '../dto/role.dto'
import { Role } from '../entity/role.entity'
import { AuthenticatedUser, Public, RoleMatchingMode, Roles } from 'nest-keycloak-connect'


//@Roles({  roles: ["ADMIN","realm:ADMIN"], mode: RoleMatchingMode.ANY })
@Controller('/roles')
@ApiTags('Role')
@ApiBearerAuth()
@Public()
export class RoleController {
  constructor(@Inject(RoleService) private readonly service: RoleService) {}

  getService(): RoleService {
    return this.service
  }

  @Get('/')
  @ApiOkResponse({ type: RolePaginationDto })
  async findAll(@Query() query: RoleQueryDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //const { user } = request
    // If necessary, have the session Role
    return this.getService().fetch(query)
  }

  @Get('/:id')
  @ApiOkResponse({ type: Role, description: 'Role detail' })
  @ApiNotFoundResponse({ description: 'Role not found' })
  findOne(@Param() params: IdParams) {
    return this.getService().findByIdOrFail(params.id)
  }

  @Post('/')
  @ApiBody({ type: RoleDto, required: true })
  @ApiCreatedResponse({ type: Role, description: 'Role created' })
  async save(@Body() entity: RoleDto) {
    return this.getService().create(entity)
  }

  @Delete('/:id')
  @ApiNoContentResponse({ description: 'Role deleted' })
  @ApiNotFoundResponse({ description: 'The Role you want to delete does not exist' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@AuthenticatedUser() user: any, @Param() params: IdParams) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //const { user } = request
    await this.getService().delete(params.id)
  }

  @Put('/:id')
  @ApiNoContentResponse({ description: 'Role updated' })
  @ApiNotFoundResponse({ description: 'The Role you want to update does not exist' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Param() params: IdParams, @Body() entity: UpdateRoleDto) {
    await this.getService().updateById(params.id, entity)
  }
}
