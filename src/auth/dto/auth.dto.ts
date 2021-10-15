import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {

    @ApiProperty()
    id: number;

    @ApiProperty()
    username: string;

}