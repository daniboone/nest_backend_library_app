import { ApiProperty } from "@nestjs/swagger";

export class ProfileDto {

    @ApiProperty()
    name: string;

    @ApiProperty()
    surname: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    email_address: string;

    @ApiProperty()
    phone_number: string;

    @ApiProperty()
    photo: string;

}