/* eslint-disable @typescript-eslint/no-explicit-any */
import 'dotenv/config'

import { DataSource, DataSourceOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

export const dataSourceOptions: DataSourceOptions = {
  type: process.env.DB_CONNECTION as any,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '8100'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  schema: process.env.DB_SCHEMA,
  entities: [`${__dirname}/**/**/*.entity{.ts,.js}`],
  synchronize: false, //se reemplazo por seguridad process.env.DB_SYNCHRONIZE == 'true'
  namingStrategy: new SnakeNamingStrategy(),
  migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
  migrationsRun: false,
  /*IGNACIO: DUMMY MODIFICAR PARA PRODUCCION*/
  options: {
    encrypt: false, // Esto desactiva el uso de SSL
    trustServerCertificate: true, // Esto indica al servidor que confíe en el certificado del servidor
  },
  logging: process.env.DB_LOGGING == 'true',
  logger: 'advanced-console',
}

export default new DataSource(dataSourceOptions)
