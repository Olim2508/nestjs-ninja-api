import {IsEnum, MinLength, IsString} from "class-validator";

export class RegisterUserDto {
  @IsString({message: "Must be string"})
  username: string;

  @IsString({message: "Must be string"})
  password: string;
}
