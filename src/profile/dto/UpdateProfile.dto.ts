import { PartialType } from "@nestjs/swagger";
import { CreateProfileDto } from "./CreateProfile.dto";

export class UpdateProfileDto extends PartialType(CreateProfileDto) {}