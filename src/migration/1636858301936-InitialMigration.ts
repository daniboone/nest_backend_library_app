import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1636858301936 implements MigrationInterface {
    name = 'InitialMigration1636858301936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "delete" ("id" SERIAL NOT NULL, "delete" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_9d28a72fc43f1ecd946ad009059" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "read" ("id" SERIAL NOT NULL, "read" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a41d9620e3769b9c07b52fe1e77" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "resource" ("id" SERIAL NOT NULL, "resourcename" character varying NOT NULL DEFAULT 'User', CONSTRAINT "UQ_e23b912fb696f44548fef7ca2dc" UNIQUE ("resourcename"), CONSTRAINT "PK_e2894a5867e06ae2e8889f1173f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "update" ("id" SERIAL NOT NULL, "update" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_575f77a0576d6293bc1cb752847" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profile" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "surname" character varying NOT NULL, "address" character varying NOT NULL, "email_address" character varying NOT NULL, "phone_number" character varying NOT NULL, "photo" character varying, CONSTRAINT "UQ_a27a8b1ba9fbe29ee913ddf860f" UNIQUE ("email_address"), CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "profileId" integer, "usergroupId" integer, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "REL_9466682df91534dd95e4dbaa61" UNIQUE ("profileId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_group" ("id" SERIAL NOT NULL, "groupname" character varying NOT NULL DEFAULT 'user', CONSTRAINT "UQ_9dd8b804da1a7fbdc101dd18e4e" UNIQUE ("groupname"), CONSTRAINT "PK_3c29fba6fe013ec8724378ce7c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_group_rights" ("id" SERIAL NOT NULL, "usergroupId" integer, "resourcesId" integer, "createId" integer, "readId" integer, "updateId" integer, "deleteId" integer, CONSTRAINT "PK_93a7467fdb9988a82c169a5ac47" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "create" ("id" SERIAL NOT NULL, "create" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_624314933af74d5bc76aaff2c2e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_9466682df91534dd95e4dbaa616" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_8d75146a8ec71692f699fea199d" FOREIGN KEY ("usergroupId") REFERENCES "user_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_group_rights" ADD CONSTRAINT "FK_3752b94e6eb14d3932a5e074523" FOREIGN KEY ("usergroupId") REFERENCES "user_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_group_rights" ADD CONSTRAINT "FK_0e6347196c16b4cecac30184c58" FOREIGN KEY ("resourcesId") REFERENCES "resource"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_group_rights" ADD CONSTRAINT "FK_353803b4b4da46eb56278ef993c" FOREIGN KEY ("createId") REFERENCES "create"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_group_rights" ADD CONSTRAINT "FK_beca79e5fe3aac8ad7b81cc7c86" FOREIGN KEY ("readId") REFERENCES "read"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_group_rights" ADD CONSTRAINT "FK_e89ceaff20d44a76b35d8b56050" FOREIGN KEY ("updateId") REFERENCES "update"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_group_rights" ADD CONSTRAINT "FK_c2b777edcc41790007828989c7f" FOREIGN KEY ("deleteId") REFERENCES "delete"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_group_rights" DROP CONSTRAINT "FK_c2b777edcc41790007828989c7f"`);
        await queryRunner.query(`ALTER TABLE "user_group_rights" DROP CONSTRAINT "FK_e89ceaff20d44a76b35d8b56050"`);
        await queryRunner.query(`ALTER TABLE "user_group_rights" DROP CONSTRAINT "FK_beca79e5fe3aac8ad7b81cc7c86"`);
        await queryRunner.query(`ALTER TABLE "user_group_rights" DROP CONSTRAINT "FK_353803b4b4da46eb56278ef993c"`);
        await queryRunner.query(`ALTER TABLE "user_group_rights" DROP CONSTRAINT "FK_0e6347196c16b4cecac30184c58"`);
        await queryRunner.query(`ALTER TABLE "user_group_rights" DROP CONSTRAINT "FK_3752b94e6eb14d3932a5e074523"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_8d75146a8ec71692f699fea199d"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9466682df91534dd95e4dbaa616"`);
        await queryRunner.query(`DROP TABLE "create"`);
        await queryRunner.query(`DROP TABLE "user_group_rights"`);
        await queryRunner.query(`DROP TABLE "user_group"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TABLE "update"`);
        await queryRunner.query(`DROP TABLE "resource"`);
        await queryRunner.query(`DROP TABLE "read"`);
        await queryRunner.query(`DROP TABLE "delete"`);
    }

}
