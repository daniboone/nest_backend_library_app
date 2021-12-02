import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateLoanedBookDto {

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    date_loaned: Date;

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    date_due: Date;

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    date_returned: Date;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    overdue_fine: number;

}