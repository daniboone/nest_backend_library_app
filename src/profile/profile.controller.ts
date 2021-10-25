import { BadRequestException, Controller, Param, Patch, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FileDto } from 'src/utils/files/dto/file.dto';
import { FileService } from 'src/utils/files/file.service';
import { ProfileService } from './profile.service';

const fileService = new FileService();

@Controller('profile')
export class ProfileController {

    constructor(
        private profileService: ProfileService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Patch('file/:id')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
        destination: './upload/profile',
        filename: fileService.editFileName,
        }),
        fileFilter: fileService.imageFileFilter
    }))
    @ApiBody({
        description: 'Profile Pic Upload',
        type: FileDto,
    })
    profilePic(@UploadedFile() file: Express.Multer.File, @Param('id') id: number){
        try {
            this.profileService.update(id, {photo: file.filename});
            return {filename: file.filename};
        } catch (error) {
            throw new BadRequestException(null, error.message);
        }
        
    }

}