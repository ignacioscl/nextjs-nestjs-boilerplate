import { HttpStatus } from '@nestjs/common'
export class DataError extends Error {
  type: string

  status: number
  validationErrors: IdetailError[]
  httpStatus?: HttpStatus
  description?: string
  constructor(status: number, message: string, type = 'DataError', httpStatus?: HttpStatus, description?: string) {
    super(message)
    this.type = type
    this.status = status
    this.httpStatus = httpStatus
    this.description = description
  }
}

export interface IdetailError   
  { 
    field: string,
    message: string
  }