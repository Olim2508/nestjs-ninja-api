import {Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum WeaponType {
  GUN = 'gun',
  SWORD = 'sword',
}

@Entity()
export class Ninja {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: WeaponType,
    default: WeaponType.GUN,
  })
  weapon: "gun" | "sword";
}