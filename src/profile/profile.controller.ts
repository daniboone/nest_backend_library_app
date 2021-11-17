import { BadRequestException, Body, Controller, Get, Param, Patch, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { CheckPolicies } from 'src/casl/decorator/police.decorator';
import { Action } from 'src/enums/Action';
import { FileDto } from 'src/utils/files/dto/file.dto';
import { FileService } from 'src/utils/files/file.service';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';
import { PoliciesGuard } from 'src/casl/guards/police.guard';
import { UpdateProfileDto } from './dto/UpdateProfile.dto';

const fileService = new FileService();

@Controller('profile')
export class ProfileController {

    constructor(
        private profileService: ProfileService,
    ) { }

    @Get()
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, PoliciesGuard)
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Profile))
    findAll(): Promise<Profile[]> {
        return this.profileService.findAll();
    }

    @Patch('file/:id')
    @ApiBody({
        description: 'Profile Pic Upload',
        type: FileDto,
    })
    @UseGuards(JwtAuthGuard, PoliciesGuard)
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, Profile))
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
        destination: './upload/profile',
        filename: fileService.editFileName,
        }),
        fileFilter: fileService.imageFileFilter
    }))
    profilePic(@UploadedFile() file: Express.Multer.File, @Param('id') id: number){
        try {
            this.profileService.update(id, {photo: file.filename});
            return {filename: file.filename};
        } catch (error) {
            throw new BadRequestException(null, error.message);
        }
        
    }

    @Patch(':id')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, PoliciesGuard)
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, Profile))
    async update(@Param('id') id: number, @Body() updateProfileDto: UpdateProfileDto): Promise<Profile> {
        const profileEdited = await this.profileService.update(id, updateProfileDto);
        return profileEdited;
    }

}