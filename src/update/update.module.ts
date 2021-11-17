import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Update } from './update.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Update])]
})
export class UpdateModule {}
