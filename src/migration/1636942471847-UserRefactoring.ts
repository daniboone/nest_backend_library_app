import { Profile } from "src/profile/profile.entity";
import { UserGroup } from "src/user-group/user-group.entity";
import { User } from "src/users/user.entity";
import {MigrationInterface, QueryRunner} from "typeorm";

export class UserRefactoring1636942471847 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const user = new User();
        const profile = new Profile();
        profile.id = 1;
        const usergroup = new UserGroup();
        usergroup.id = 2;


        user.username = "john";
        user.password = "password@Alv7";
        user.profile = profile;
        user.usergroup = usergroup;
        
    
        await queryRunner.manager.save(user);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
