import { Module } from '@nestjs/common';
import { NinjasController } from './ninjas.controller';
import { NinjasService } from './ninjas.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Ninja} from "./ninjas.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Ninja])],
  controllers: [NinjasController],
  providers: [NinjasService],
})
export class NinjasModule {}
