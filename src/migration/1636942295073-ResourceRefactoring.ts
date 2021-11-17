import { Resource } from "src/resource/resource.entity";
import {MigrationInterface, QueryRunner} from "typeorm";

export class ResourceRefactoring1636942295073 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const resource1 = new Resource();
        const resource2 = new Resource();
    
        resource1.resourcename = 'User';
        resource2.resourcename = 'Profile';
        const resources = [resource1, resource2];

        await queryRunner.manager.save(resources);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
