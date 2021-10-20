import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { MulterModule } from '@nestjs/platform-express';
import { ProfileModule } from 'src/profile/profile.module';
import { FileController } from './file.controller';

@Module({
  imports:[
    MulterModule.registerAsync({
      useClass: FileService
    }),
    ProfileModule
  ],
  providers: [FileService],
  controllers: [FileController]
})

export class FileModule {}