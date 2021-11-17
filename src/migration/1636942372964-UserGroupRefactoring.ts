import { UserGroup } from "src/user-group/user-group.entity";
import {MigrationInterface, QueryRunner} from "typeorm";

export class UserGroupRefactoring1636942372964 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const usergroup1 = new UserGroup();
        const usergroup2 = new UserGroup();


        usergroup1.groupname = "User";
        usergroup2.groupname = "Admin";

        const usergroups = [usergroup2, usergroup1]
        
    
        await queryRunner.manager.save(usergroups);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
