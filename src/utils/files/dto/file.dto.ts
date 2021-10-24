import { ApiProperty } from "@nestjs/swagger";
import { IsMimeType } from "class-validator";

export class FileDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    @IsMimeType()
    file: any;
}