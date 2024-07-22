import { NestFactory, Reflector } from '@nestjs/core';

import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { ClassSerializerInterceptor, HttpStatus, ValidationPipe } from '@nestjs/common';
import { PaginationInterceptor } from './commons/interceptor/pagination.interceptor';
import { DataError, IdetailError } from './commons/errors/data.error';
import { ValidationError } from 'class-validator';
import { LoggerCustom } from './commons/logger/logger.custom';
import { ErrorFilter } from './commons/filter/error.filter';
import { DataErrorFilter } from './commons/filter/data.error.filter';
import { DataSource } from 'typeorm';
import { dataSourceOptions } from './typeorm.config';

async function bootstrap() {
  initializeTransactionalContext();

  const dataSource = new DataSource(dataSourceOptions);
  
  // Inicializar DataSource
  await dataSource.initialize();

  // Ejecutar migraciones
  await dataSource.runMigrations();

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

const logger = await app.resolve(LoggerCustom); // Use resolve instead of get for TRANSIENT scope
 app.useLogger(logger);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 5000;

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) => {

        /*
        await app.useGlobalPipes(new ValidationPipe({
        exceptionFactory: (errors: ValidationError[]) =>
        {
          const customError = errors.map((el) =>
          {
            if(el.constraints.isString)
            {
              return "O nome do produto é obrigatório"
            }

            if(el.constraints.isNotEmpty)
            {
              return "A quantidade do produto é obrigatória"
            }

          });
          
          return new HttpException(customError, HttpStatus.BAD_REQUEST);
        }
      }));

        */
        const result : IdetailError[] = errors.map((error) => ({
          field: error.property,
          message: error?.constraints ? error?.constraints[Object.keys(error.constraints as any)[0]] : '',
        }));
        
        const err = new DataError(HttpStatus.BAD_REQUEST ,"Validation Error");
        err.validationErrors = result
        return err;
      },
      stopAtFirstError: false,
    }),
  )
  const reflector = app.get(Reflector)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector), new PaginationInterceptor())

  app.useGlobalFilters(new ErrorFilter())
  app.useGlobalFilters(new DataErrorFilter(logger))

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
