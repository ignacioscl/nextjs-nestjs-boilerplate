import { Controller, Get, UseGuards } from '@nestjs/common';
import { DemoService } from '../service/demo.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedUser, Resource, ResourceGuard, RoleMatchingMode, Roles } from 'nest-keycloak-connect';

@Controller('/')
export class DemoController {
  constructor(private readonly appService: DemoService) {}

  @Get('/getHello')
  @Resource('')
  @Roles({  roles: ["SOLICITAR_CUENTA_CORRIENTE","realm:SOLICITAR_CUENTA_CORRIENTE"], mode: RoleMatchingMode.ANY })//SOLICITAR_CUENTA_CORRIENTE , ADMIN
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/getUser')
  @Resource('')
  @Roles({  roles: ["SOLICITAR_CUENTA_CORRIENTE","realm:SOLICITAR_CUENTA_CORRIENTE"], mode: RoleMatchingMode.ANY })//SOLICITAR_CUENTA_CORRIENTE , ADMIN
  getUser(@AuthenticatedUser() user: any): string {
    return user;
  }
  
}