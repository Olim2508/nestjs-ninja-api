import {
  Body,
  Controller,
  Delete,
  Get, NotFoundException,
  Param, ParseIntPipe,
  Post,
  Put,
  Query, ValidationPipe,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import {WeaponType} from "./ninjas.entity";

@Controller('ninjas')
export class NinjasController {
  constructor(private readonly ninjasService: NinjasService) {}

  @Get()
  async getNinjas(@Query('weapon') weapon: WeaponType) {
    return await this.ninjasService.getNinjas()
  }

  @Get(':id')
  async getNinjaDetail(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.ninjasService.getNinja(id);
    } catch (err) {
      throw new NotFoundException()
    }
  }

  @Post()
  async createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    return await this.ninjasService.createNinja(createNinjaDto);
  }

  @Put(':id')
  updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
    return this.ninjasService.updateNinja(+id, updateNinjaDto);
  }

  @Delete(':id')
  deleteNinja(@Param('id') id: string) {
    return this.ninjasService.deleteNinja(Number(id));
  }
}
