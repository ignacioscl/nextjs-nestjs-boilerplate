import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Inject } from '@nestjs/common'
import { Response } from 'express'
//import * as Sentry from '@sentry/node'
import { DataError } from 'src/commons/errors/data.error'

import { LoggerCustom } from '../logger/logger.custom'
import { DataErrorDto } from '../dto/data.error.dto'

@Catch(Error)
export class DataErrorFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerCustom) {
  logger.setContext(DataErrorFilter.name)
}
  catch(exception: DataError, host: ArgumentsHost) {
    this.logger.error("DataErrorFilter",exception)
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    const message = exception?.message ?? exception.message
    const detail = exception?.description ?? exception.description
    const validations = exception?.validationErrors ?? "";
    const status = exception.status || 500
    if (detail) {
      this.logger.error("DataErrorFilter","Detail: " + detail)
    }
    /*Sentry.addBreadcrumb({
      message: exception.message,
      data: request.body ?? undefined,
      category: request.url,
      level: status >= 500 ? 'fatal' : 'error',
    })
    Sentry.captureException(exception)*/
    response.status(status).json({
      statusCode: status,
      path: request.url,
      message,
      detailError: detail,
      validationErrors:validations,
      body: request.body ?? undefined,
      method: request.method ?? undefined,
    } as DataErrorDto<any>)
  }
}
