import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeycloakModule } from './features/keycloak/keycloak.module';
import { DemoModule } from './features/demo/demo.module';
import configuration from './configuration';
import { LoggerCustomModule } from './commons/logger/logger.custom.module';
import { dataSourceOptions } from './typeorm.config';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { RoleModule } from './features/role/role.module'

//ImportTemplateModule
//NO BORRAR LA LINEA DE ARRIBA
@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return dataSourceOptions;
      },
      inject: [ConfigService],
      dataSourceFactory: async (options) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return addTransactionalDataSource(new DataSource(dataSourceOptions));
      },
    }),
    LoggerCustomModule,
    KeycloakModule,
    DemoModule,
    RoleModule,
    //TemplateModule
    //NO BORRAR LA LINEA DE ARRIBA
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
