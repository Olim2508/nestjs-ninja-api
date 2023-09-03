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

@Controller('ninjas')
export class NinjasController {
  constructor(private readonly ninjasService: NinjasService) {}

  @Get()
  getNinjas(@Query('weapon') weapon: 'sword' | 'gun') {
    return this.ninjasService.getNinjas(weapon);
  }

  @Get(':id')
  getNinjaDetail(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.ninjasService.getNinja(id);
    } catch (err) {
      throw new NotFoundException()
    }
  }

  @Post()
  createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    this.ninjasService.createNinja(createNinjaDto);
    return {
      message: 'success',
    };
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
