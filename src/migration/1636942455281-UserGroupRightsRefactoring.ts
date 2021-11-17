import { Create } from "src/create/create.entity";
import { Delete } from "src/delete/delete.entity";
import { Read } from "src/read/read.entity";
import { Resource } from "src/resource/resource.entity";
import { Update } from "src/update/update.entity";
import { UserGroupRights } from "src/user-group-rights/user-group-rights.entity";
import { UserGroup } from "src/user-group/user-group.entity";
import {MigrationInterface, QueryRunner} from "typeorm";

export class UserGroupRightsRefactoring1636942455281 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const usergrouprights1 = new UserGroupRights();
        //const usergrouprights2 = new UserGroupRights();
        const create = new Create();
        create.id = 1;
        const update = new Update();
        update.id = 2;
        const deleter = new Delete();
        deleter.id = 2;
        const read = new Read();
        read.id = 2;
        const resource = new Resource();
        resource.id = 1;
        const usergroup = new UserGroup();
        usergroup.id = 2;


        usergrouprights1.create = create;
        usergrouprights1.update = update;
        usergrouprights1.delete = deleter;
        usergrouprights1.read = read;
        usergrouprights1.resources = resource;
        usergrouprights1.usergroup = usergroup;
        //usergrouprights2.groupname = "Admin";

        const usergrouprights = [usergrouprights1]
        
    
        await queryRunner.manager.save(usergrouprights);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
