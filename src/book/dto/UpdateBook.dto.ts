import { PartialType } from "@nestjs/swagger";
import { CreateBookDto } from "./CreateBook.dto";

export class UpdateBookDto extends PartialType(CreateBookDto) {}