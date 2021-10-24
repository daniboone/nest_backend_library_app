import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MinLength } from "class-validator";

export class UserDto {

    @ApiProperty()
    @IsString()
    @MinLength(3)
    username: string;

    /* at least 8 characters
    must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
    Can contain special characters */
    @ApiProperty()
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/) 
    password: string;

}