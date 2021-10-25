import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsPhoneNumber, IsString, Matches, MinLength } from "class-validator";

export class CreateProfileDto {

    @ApiProperty()
    @IsString()
    @MinLength(1)
    name: string;

    @ApiProperty()
    @IsString()
    @MinLength(1)
    surname: string;

    @ApiProperty()
    @IsString()
    address: string;

    @ApiProperty()
    @IsEmail()
    email_address: string;

    @ApiProperty()
    @IsPhoneNumber('MX')
    phone_number: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @MinLength(5)
    //@Matches(/.*\.(gif|jpe?g|bmp|png)$/) //regex for image validation
    photo: string;

}