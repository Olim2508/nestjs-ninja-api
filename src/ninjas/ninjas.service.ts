import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {
  private ninjas: ({ new(): RemoveFieldsWithType<Partial<CreateNinjaDto>, Function>; new(...args: any[]): RemoveFieldsWithType<Partial<CreateNinjaDto>, Function>; call(this: Function, thisArg: any, ...argArray: any[]): any; weapon: "sword" | "gun"; caller: Function; bind(this: Function, thisArg: any, ...argArray: any[]): any; apply(this: Function, thisArg: any, argArray?: any): any; readonly name: string; readonly length: number; [Symbol.hasInstance](value: any): boolean; toString(): string; arguments: any; id: number; prototype: any } | { weapon: string; name: string; id: number } | { weapon: string; name: string; id: number })[] = [
    { id: 0, name: 'olim', weapon: 'sword' },
    { id: 1, name: 'mario', weapon: 'gun' },
  ];

  getNinjas(weapon?: 'sword' | 'gun') {
    if (weapon) {
      return this.ninjas.filter((ninja) => ninja.weapon === weapon);
    }
    return this.ninjas;
  }

  getNinja(id: number) {
    const ninja = this.ninjas.find((ninja) => ninja.id == id);
    if (!ninja) {
      throw new Error('Ninja not found');
    }
    return ninja;
  }

  createNinja(createNinjaDto: CreateNinjaDto) {
    const newNinja = {
      ...createNinjaDto,
      id: Date.now(),
    };
    this.ninjas.push(newNinja);
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
