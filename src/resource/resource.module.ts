import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resource } from './resource.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resource])],
})
export class ResourceModule {}
