import { Injectable } from '@nestjs/common';

@Injectable()
export class DemoService {
  getHello(): string {
    return '{"message": "User con rol SOLICITAR_CUENTA_CORRIENTE!"}';
  }
}
