import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delete } from './delete.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Delete])]
})
export class DeleteModule {}
