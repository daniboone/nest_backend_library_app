import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Create } from './create.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Create])]
})
export class CreateModule {}
