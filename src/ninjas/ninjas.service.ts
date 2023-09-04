import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Ninja, WeaponType} from "./ninjas.entity";
import {Repository} from "typeorm";

@Injectable()
export class NinjasService {
  constructor(
    @InjectRepository(Ninja)
    private ninjasRepository: Repository<Ninja>,
  ) {}

  private ninjas = [
      { id: 0, name: 'olim', weapon: 'sword' },
      { id: 1, name: 'mario', weapon: 'gun' },
  ]

  async getNinjas(): Promise<Ninja[]> {
    return await this.ninjasRepository.find();
  }

  async getNinja(id: number) {
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

  async createNinja(createNinjaDto: CreateNinjaDto) {
    const ninja = this.ninjasRepository.create(createNinjaDto);
    return await this.ninjasRepository.save(ninja);
  }

  updateNinja(id: number, updateNinjaDto: UpdateNinjaDto) {
    this.ninjas = this.ninjas.map((ninja) => {
      if (ninja.id == id) {
        return { ...ninja, ...updateNinjaDto };
      }
      return ninja;
    });
    return this.getNinja(id);
  }

  deleteNinja(id: number) {
    const toBeRemoved = this.getNinja(id);
    this.ninjas = this.ninjas.filter((ninja) => ninja.id != id);
    return toBeRemoved;
  }
}
