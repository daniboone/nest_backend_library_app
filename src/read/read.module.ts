import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Read } from './read.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Read])]
})
export class ReadModule {}
