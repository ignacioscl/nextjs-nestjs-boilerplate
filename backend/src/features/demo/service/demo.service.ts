import { Injectable } from '@nestjs/common';

@Injectable()
export class DemoService {
  getHello(): string {
    return '{"message": "TEST!"}';
  }
}
