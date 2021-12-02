import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageLink } from './image-link.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ImageLink])]
})
export class ImageLinksModule {}
