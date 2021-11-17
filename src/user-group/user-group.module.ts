import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGroup } from './user-group.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserGroup])],
})
export class UserGroupModule {}
