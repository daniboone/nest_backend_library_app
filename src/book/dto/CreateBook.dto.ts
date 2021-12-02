import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateBookDto {

    @ApiProperty()
    @IsString()
    @MinLength(1)
    kind: string;

    @ApiProperty()
    @IsString()
    @MinLength(1)
    etag: string;

}