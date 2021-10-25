import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService implements MulterOptionsFactory {

  editFileName = (req, file, cb) => {
    const name = uuidv4();
    const fileExtName = extname(file.originalname);
    
    cb(null, `${name}${fileExtName}`);
  };
  
  imageFileFilter = (req, file, cb) => {
    if (!file.mimetype.match('image')) {
      return cb(new HttpException('Only image files are allowed!',
        HttpStatus.BAD_REQUEST), false);
    }
    cb(null, true);
  };
  
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        filename: this.editFileName,
        destination: 'upload'
      }),
      fileFilter: this.imageFileFilter
    };
  }
}