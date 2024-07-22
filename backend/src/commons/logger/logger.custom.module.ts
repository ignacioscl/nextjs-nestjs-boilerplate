import { Module } from "@nestjs/common";
import { LoggerCustom } from "./logger.custom";

@Module({
    providers: [LoggerCustom],
    exports: [LoggerCustom],
  })
  export class LoggerCustomModule {}