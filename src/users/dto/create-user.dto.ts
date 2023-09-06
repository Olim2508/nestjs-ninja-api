import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class RegisterUserDto {
    @ApiProperty()
    @IsString({message: "Must be string"})
    username: string;

    @ApiProperty()
    @IsString({message: "Must be string"})
    password: string;
}
