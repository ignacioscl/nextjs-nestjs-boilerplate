import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KeycloakConnectModule, ResourceGuard, RoleGuard, AuthGuard, PolicyEnforcementMode, TokenValidation } from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    forwardRef(() => ConfigModule),
    KeycloakConnectModule.registerAsync({
      imports: [forwardRef(() => ConfigModule)],
      useFactory: async (configService: ConfigService) => {
        //const logger = new Logger('KeycloakConnectModule');
        console.log(`Using Keycloak URL: ${configService.get<string>('KEYCLOAK_AUTH_SERVER_URL')}`);
        console.log(`KEYCLOAK_REALM : ${configService.get<string>('KEYCLOAK_REALM')}`);
        console.log(`KEYCLOAK_CLIENT_ID: ${configService.get<string>('KEYCLOAK_CLIENT_ID')}`);
        console.log(`KEYCLOAK_SECRET: ${configService.get<string>('KEYCLOAK_SECRET')}`);
        return {
            "authServerUrl": configService.get<string>('KEYCLOAK_AUTH_SERVER_URL'),
            "realm": configService.get<string>('KEYCLOAK_REALM'),
            "clientId": configService.get<string>('KEYCLOAK_CLIENT_ID'),
            "secret": configService.get<string>('KEYCLOAK_SECRET'),
            "tokenValidation": TokenValidation.ONLINE,
            "policyEnforcement": PolicyEnforcementMode.PERMISSIVE,
            "logLevels": ['verbose', 'error','debug','log','warn'],
          };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class KeycloakModule {}
