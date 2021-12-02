import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VolumeInfo } from './volume-info.entity';
import { VolumeInfoService } from './volume-info.service';
import { VolumeInfoController } from './volume-info.controller';

@Module({
    imports: [TypeOrmModule.forFeature([VolumeInfo])],
    providers: [VolumeInfoService],
    controllers: [VolumeInfoController]
})
export class VolumeInfoModule {}
