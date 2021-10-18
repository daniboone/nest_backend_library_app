import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

const editFileName = (req, file, cb) => {
  const name = uuidv4();
  const fileExtName = extname(file.originalname);
  
  cb(null, `${name}${fileExtName}`);
};

const imageFileFilter = (req, file, cb) => {
  if (!file.mimetype.match('image')) {
    return cb(new HttpException('Only image files are allowed!',
      HttpStatus.UNSUPPORTED_MEDIA_TYPE), false);
  }
  cb(null, true);
};

@Injectable()
export class FileService implements MulterOptionsFactory {
  
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        filename: editFileName,
        destination: 'upload'
      }),
      fileFilter: imageFileFilter
    };
  }
}