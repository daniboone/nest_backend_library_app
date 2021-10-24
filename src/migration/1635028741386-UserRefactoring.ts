import {MigrationInterface, QueryRunner} from "typeorm";

export class UserRefactoring1635028741386 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('drop table if exists "user" cascade');
    }

}
