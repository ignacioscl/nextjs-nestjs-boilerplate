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

import { TemplateService } from '../service/template'
import { TemplateDto, TemplatePaginationDto, TemplateQueryDto, UpdateTemplateDto } from '../dto/template'
import { Template } from '../entity/template'
import { AuthenticatedUser, RoleMatchingMode, Roles } from 'nest-keycloak-connect'


@Roles({  roles: ["SOLICITAR_CUENTA_CORRIENTE","realm:SOLICITAR_CUENTA_CORRIENTE"], mode: RoleMatchingMode.ANY })
@Controller('/template')
@ApiTags('Template')
@ApiBearerAuth()
export class TemplateController {
  constructor(@Inject(TemplateService) private readonly service: TemplateService) {}

  getService(): TemplateService {
    return this.service
  }

  @Get('/')
  @ApiOkResponse({ type: TemplatePaginationDto })
  async findAll(@Query() query: TemplateQueryDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //const { user } = request
    // If necessary, have the session Template
    return this.getService().fetch(query)
  }

  @Get('/:id')
  @ApiOkResponse({ type: Template, description: 'Template detail' })
  @ApiNotFoundResponse({ description: 'Template not found' })
  findOne(@Param() params: IdParams) {
    return this.getService().findByIdOrFail(params.id)
  }

  @Post('/')
  @ApiBody({ type: TemplateDto, required: true })
  @ApiCreatedResponse({ type: Template, description: 'Template created' })
  async save(@Body() entity: TemplateDto) {
    return this.getService().create(entity)
  }

  @Delete('/:id')
  @ApiNoContentResponse({ description: 'Template deleted' })
  @ApiNotFoundResponse({ description: 'The Template you want to delete does not exist' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@AuthenticatedUser() user: any, @Param() params: IdParams) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //const { user } = request
    await this.getService().delete(params.id)
  }

  @Put('/:id')
  @ApiNoContentResponse({ description: 'Template updated' })
  @ApiNotFoundResponse({ description: 'The Template you want to update does not exist' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Param() params: IdParams, @Body() entity: UpdateTemplateDto) {
    await this.getService().updateById(params.id, entity)
  }
}
