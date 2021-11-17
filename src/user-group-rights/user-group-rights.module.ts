import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGroupRights } from './user-group-rights.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserGroupRights])]
})
export class UserGroupRightsModule {}
