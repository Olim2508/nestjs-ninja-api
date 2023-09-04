import {IsEnum, MinLength} from "class-validator";

enum Weapon {
  Gun = 'gun',
  Sword = 'sword',
}

export class BaseNinjaDto {

  @MinLength(3)
  name: string;

  @IsEnum(Weapon, {message: "use correct weapon"})
  weapon: Weapon
}

export class CreateNinjaDto extends BaseNinjaDto {}
