import {Injectable} from '@nestjs/common';
import {CreateNinjaDto} from './dto/create-ninja.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Ninja} from "./ninjas.entity";
import {Repository} from "typeorm";
import {UpdateNinjaDto} from "./dto/update-ninja.dto";

@Injectable()
export class NinjasService {
    constructor(
        @InjectRepository(Ninja)
        private ninjasRepository: Repository<Ninja>,
    ) {
    }

    async getNinjas(): Promise<Ninja[]> {
        return await this.ninjasRepository.find();
    }

    async getNinja(id: number): Promise<Ninja> {
        const ninja = await this.ninjasRepository.findOne({
            where: {
                id: id,
            },
        })
        if (!ninja) {
            throw new Error('Ninja not found');
        }
        return ninja;
    }

    async createNinja(createNinjaDto: CreateNinjaDto): Promise<Ninja> {
        const ninja = this.ninjasRepository.create(createNinjaDto);
        return await this.ninjasRepository.save(ninja);
    }

    async updateNinja(id: number, updateNinjaDto: UpdateNinjaDto) {
        const ninja = await this.getNinja(id)
        Object.assign(ninja, updateNinjaDto);
        return await this.ninjasRepository.save(ninja);
    }

    async deleteNinja(id: number): Promise<void> {
        await this.ninjasRepository.delete(id)
    }
}
