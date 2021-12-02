import { PartialType } from "@nestjs/swagger";
import { CreateLoanedBookDto } from "./CreateLoanedBook.dto";

export class UpdateLoanedBookDto extends PartialType(CreateLoanedBookDto) {}