import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmptyObject, IsNumber, IsString } from "class-validator";
import { Profile } from "src/profile/profile.entity";
import { UserGroup } from "src/user-group/user-group.entity";

export class AuthDto {

    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsNotEmptyObject()
    profile: Profile;

    @ApiProperty()
    @IsNotEmptyObject()
    usergroup: UserGroup;

}