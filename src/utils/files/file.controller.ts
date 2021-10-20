import { Controller, InternalServerErrorException, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody } from '@nestjs/swagger';
import { FileDto } from './dto/file.dto';

@Controller('upload')
export class FileController{
  
  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    description: 'Single Image Upload',
    type: FileDto,
  })
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      const response = {
        originalname: file.originalname,
        filename: file.filename
      };
      return response; 
    } catch (e) {
      // An unknown error occurred when uploading.
      console.error(e.message)
      throw new InternalServerErrorException();    
    }
  }
}