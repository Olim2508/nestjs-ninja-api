import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    ValidationPipe,
} from '@nestjs/common';
import {CreateNinjaDto} from './dto/create-ninja.dto';
import {NinjasService} from './ninjas.service';
import {WeaponType} from "./ninjas.entity";
import {UpdateNinjaDto} from "./dto/update-ninja.dto";

@Controller('ninjas')
export class NinjasController {
    constructor(private readonly ninjasService: NinjasService) {
    }

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
    async updateNinja(@Param('id') id: string, @Body(new ValidationPipe()) updateNinjaDto: UpdateNinjaDto) {
        try {
            return await this.ninjasService.updateNinja(+id, updateNinjaDto);
        } catch (err) {
            console.log(err)
            throw new NotFoundException()
        }
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteNinja(@Param('id') id: string) {
        try {
            await this.ninjasService.deleteNinja(+id);
        } catch (err) {
            throw new NotFoundException()
        }
    }
}
