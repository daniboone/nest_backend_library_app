import { Controller, InternalServerErrorException, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class FileController{
  
  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      const response = {
        originalname: file.originalname,
        filename: file.filename
      };
      return response; 
    } catch (e) {
      // An unknown error occurred when uploading.
      console.error(e)
      throw new InternalServerErrorException();    
    }
  }
}