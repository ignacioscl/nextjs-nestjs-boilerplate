import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DemoController } from './controller/demo.controller'
import { DemoService } from './service/demo.service'



@Module({
  imports: [/*TypeOrmModule.forFeature([Zona])*/],
  providers: [/*ZonaRepository, ZonaService*/DemoService],
  controllers: [DemoController],
  exports: [DemoService],
})
export class DemoModule {}
