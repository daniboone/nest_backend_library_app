import {MigrationInterface, QueryRunner} from "typeorm";

export class ProfileRefactoring1635045967946 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('drop table if exists "profile" cascade');
    }

}
