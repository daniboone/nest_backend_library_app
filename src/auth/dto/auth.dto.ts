import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class AuthDto {

    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsString()
    username: string;

}