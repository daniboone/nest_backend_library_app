import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndustryIdentifier } from './industry-identifiers.entity';

@Module({
    imports: [TypeOrmModule.forFeature([IndustryIdentifier])]
})
export class IndustryIdentifiersModule {}
