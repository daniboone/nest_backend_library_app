import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1636858301936 implements MigrationInterface {
    name = 'InitialMigration1636858301936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "author" ("id" SERIAL NOT NULL, "author" character varying NOT NULL, CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "loan_status" ("id" SERIAL NOT NULL, "status_name" character varying NOT NULL, CONSTRAINT "PK_96fdd831fdc84793047c178f7f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profile" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "surname" character varying NOT NULL, "address" character varying NOT NULL, "email_address" character varying NOT NULL, "phone_number" character varying NOT NULL, "photo" character varying, CONSTRAINT "UQ_a27a8b1ba9fbe29ee913ddf860f" UNIQUE ("email_address"), CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "create" ("id" SERIAL NOT NULL, "create" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_624314933af74d5bc76aaff2c2e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "delete" ("id" SERIAL NOT NULL, "delete" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_9d28a72fc43f1ecd946ad009059" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "read" ("id" SERIAL NOT NULL, "read" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a41d9620e3769b9c07b52fe1e77" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "resource" ("id" SERIAL NOT NULL, "resourcename" character varying NOT NULL DEFAULT 'User', CONSTRAINT "UQ_e23b912fb696f44548fef7ca2dc" UNIQUE ("resourcename"), CONSTRAINT "PK_e2894a5867e06ae2e8889f1173f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "update" ("id" SERIAL NOT NULL, "update" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_575f77a0576d6293bc1cb752847" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_group_rights" ("id" SERIAL NOT NULL, "usergroupId" integer, "resourcesId" integer, "createId" integer, "readId" integer, "updateId" integer, "deleteId" integer, CONSTRAINT "PK_93a7467fdb9988a82c169a5ac47" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_group" ("id" SERIAL NOT NULL, "groupname" character varying NOT NULL DEFAULT 'user', CONSTRAINT "UQ_9dd8b804da1a7fbdc101dd18e4e" UNIQUE ("groupname"), CONSTRAINT "PK_3c29fba6fe013ec8724378ce7c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "profileId" integer, "usergroupId" integer, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "REL_9466682df91534dd95e4dbaa61" UNIQUE ("profileId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "loaned_book" ("id" SERIAL NOT NULL, "date_loaned" TIMESTAMP NOT NULL, "date_due" TIMESTAMP NOT NULL, "date_returned" TIMESTAMP NOT NULL, "overdue_fine" numeric, "loanStatusId" integer, "bookId" integer, "userId" integer, CONSTRAINT "PK_aebcec53fce6170fa668b31c710" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "image_link" ("id" SERIAL NOT NULL, "smallThumbnail" character varying, "thumbnail" character varying, "small" character varying, "medium" character varying, "large" character varying, "extraLarge" character varying, CONSTRAINT "PK_595fa197167168c3518a8016cf3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "industry_identifier" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "identifier" character varying NOT NULL, CONSTRAINT "PK_c4140594071315d64ea653a238b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "volume_info" ("id" SERIAL NOT NULL, "title" character varying, "subtitle" character varying, "publisher" character varying, "publishedDate" TIMESTAMP, "description" character varying, "language" character varying, "imageLinkId" integer, CONSTRAINT "REL_38acbd1c9c96110dbbd90ce286" UNIQUE ("imageLinkId"), CONSTRAINT "PK_81f03620089c8b453fbf945f683" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "kind" character varying NOT NULL, "etag" character varying NOT NULL, "volumeInfoId" integer, CONSTRAINT "REL_98753c6e2a89c8486de256dc08" UNIQUE ("volumeInfoId"), CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "volume_info_authors_author" ("volumeInfoId" integer NOT NULL, "authorId" integer NOT NULL, CONSTRAINT "PK_4aac8c207507085d21cd5549c10" PRIMARY KEY ("volumeInfoId", "authorId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_18c7bee1b8eb4acd9f51665a6d" ON "volume_info_authors_author" ("volumeInfoId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4fd7bca5950cd0180c16fcddd2" ON "volume_info_authors_author" ("authorId") `);
        await queryRunner.query(`CREATE TABLE "volume_info_categories_category" ("volumeInfoId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_9ee42d0c4b7f1fe59c08f269e03" PRIMARY KEY ("volumeInfoId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9a618a6d28c68356bae3b5543a" ON "volume_info_categories_category" ("volumeInfoId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b623230923268daee26f0ad833" ON "volume_info_categories_category" ("categoryId") `);
        await queryRunner.query(`CREATE TABLE "volume_info_industry_identifiers_industry_identifier" ("volumeInfoId" integer NOT NULL, "industryIdentifierId" integer NOT NULL, CONSTRAINT "PK_7c3b1920f1cd3463936cd9c4e79" PRIMARY KEY ("volumeInfoId", "industryIdentifierId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dea874811ccd1c53322ac5588f" ON "volume_info_industry_identifiers_industry_identifier" ("volumeInfoId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ca69e8a54ff7f6ef73c5edec3f" ON "volume_info_industry_identifiers_industry_identifier" ("industryIdentifierId") `);
        await queryRunner.query(`ALTER TABLE "user_group_rights" ADD CONSTRAINT "FK_3752b94e6eb14d3932a5e074523" FOREIGN KEY ("usergroupId") REFERENCES "user_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_group_rights" ADD CONSTRAINT "FK_0e6347196c16b4cecac30184c58" FOREIGN KEY ("resourcesId") REFERENCES "resource"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_group_rights" ADD CONSTRAINT "FK_353803b4b4da46eb56278ef993c" FOREIGN KEY ("createId") REFERENCES "create"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_group_rights" ADD CONSTRAINT "FK_beca79e5fe3aac8ad7b81cc7c86" FOREIGN KEY ("readId") REFERENCES "read"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_group_rights" ADD CONSTRAINT "FK_e89ceaff20d44a76b35d8b56050" FOREIGN KEY ("updateId") REFERENCES "update"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_group_rights" ADD CONSTRAINT "FK_c2b777edcc41790007828989c7f" FOREIGN KEY ("deleteId") REFERENCES "delete"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_9466682df91534dd95e4dbaa616" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_8d75146a8ec71692f699fea199d" FOREIGN KEY ("usergroupId") REFERENCES "user_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loaned_book" ADD CONSTRAINT "FK_a5536ed9a405e7afcbec6c010fc" FOREIGN KEY ("loanStatusId") REFERENCES "loan_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loaned_book" ADD CONSTRAINT "FK_11e47f46b8879762dca888ade61" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loaned_book" ADD CONSTRAINT "FK_efe07d20996b0d09d4dea1144d5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "volume_info" ADD CONSTRAINT "FK_38acbd1c9c96110dbbd90ce2865" FOREIGN KEY ("imageLinkId") REFERENCES "image_link"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_98753c6e2a89c8486de256dc086" FOREIGN KEY ("volumeInfoId") REFERENCES "volume_info"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "volume_info_authors_author" ADD CONSTRAINT "FK_18c7bee1b8eb4acd9f51665a6de" FOREIGN KEY ("volumeInfoId") REFERENCES "volume_info"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "volume_info_authors_author" ADD CONSTRAINT "FK_4fd7bca5950cd0180c16fcddd2d" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "volume_info_categories_category" ADD CONSTRAINT "FK_9a618a6d28c68356bae3b5543a6" FOREIGN KEY ("volumeInfoId") REFERENCES "volume_info"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "volume_info_categories_category" ADD CONSTRAINT "FK_b623230923268daee26f0ad8335" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "volume_info_industry_identifiers_industry_identifier" ADD CONSTRAINT "FK_dea874811ccd1c53322ac5588f6" FOREIGN KEY ("volumeInfoId") REFERENCES "volume_info"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "volume_info_industry_identifiers_industry_identifier" ADD CONSTRAINT "FK_ca69e8a54ff7f6ef73c5edec3fc" FOREIGN KEY ("industryIdentifierId") REFERENCES "industry_identifier"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "volume_info_industry_identifiers_industry_identifier" DROP CONSTRAINT "FK_ca69e8a54ff7f6ef73c5edec3fc"`);
        await queryRunner.query(`ALTER TABLE "volume_info_industry_identifiers_industry_identifier" DROP CONSTRAINT "FK_dea874811ccd1c53322ac5588f6"`);
        await queryRunner.query(`ALTER TABLE "volume_info_categories_category" DROP CONSTRAINT "FK_b623230923268daee26f0ad8335"`);
        await queryRunner.query(`ALTER TABLE "volume_info_categories_category" DROP CONSTRAINT "FK_9a618a6d28c68356bae3b5543a6"`);
        await queryRunner.query(`ALTER TABLE "volume_info_authors_author" DROP CONSTRAINT "FK_4fd7bca5950cd0180c16fcddd2d"`);
        await queryRunner.query(`ALTER TABLE "volume_info_authors_author" DROP CONSTRAINT "FK_18c7bee1b8eb4acd9f51665a6de"`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_98753c6e2a89c8486de256dc086"`);
        await queryRunner.query(`ALTER TABLE "volume_info" DROP CONSTRAINT "FK_38acbd1c9c96110dbbd90ce2865"`);
        await queryRunner.query(`ALTER TABLE "loaned_book" DROP CONSTRAINT "FK_efe07d20996b0d09d4dea1144d5"`);
        await queryRunner.query(`ALTER TABLE "loaned_book" DROP CONSTRAINT "FK_11e47f46b8879762dca888ade61"`);
        await queryRunner.query(`ALTER TABLE "loaned_book" DROP CONSTRAINT "FK_a5536ed9a405e7afcbec6c010fc"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_8d75146a8ec71692f699fea199d"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9466682df91534dd95e4dbaa616"`);
        await queryRunner.query(`ALTER TABLE "user_group_rights" DROP CONSTRAINT "FK_c2b777edcc41790007828989c7f"`);
        await queryRunner.query(`ALTER TABLE "user_group_rights" DROP CONSTRAINT "FK_e89ceaff20d44a76b35d8b56050"`);
        await queryRunner.query(`ALTER TABLE "user_group_rights" DROP CONSTRAINT "FK_beca79e5fe3aac8ad7b81cc7c86"`);
        await queryRunner.query(`ALTER TABLE "user_group_rights" DROP CONSTRAINT "FK_353803b4b4da46eb56278ef993c"`);
        await queryRunner.query(`ALTER TABLE "user_group_rights" DROP CONSTRAINT "FK_0e6347196c16b4cecac30184c58"`);
        await queryRunner.query(`ALTER TABLE "user_group_rights" DROP CONSTRAINT "FK_3752b94e6eb14d3932a5e074523"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ca69e8a54ff7f6ef73c5edec3f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dea874811ccd1c53322ac5588f"`);
        await queryRunner.query(`DROP TABLE "volume_info_industry_identifiers_industry_identifier"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b623230923268daee26f0ad833"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9a618a6d28c68356bae3b5543a"`);
        await queryRunner.query(`DROP TABLE "volume_info_categories_category"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4fd7bca5950cd0180c16fcddd2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_18c7bee1b8eb4acd9f51665a6d"`);
        await queryRunner.query(`DROP TABLE "volume_info_authors_author"`);
        await queryRunner.query(`DROP TABLE "book"`);
        await queryRunner.query(`DROP TABLE "volume_info"`);
        await queryRunner.query(`DROP TABLE "industry_identifier"`);
        await queryRunner.query(`DROP TABLE "image_link"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "loaned_book"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_group"`);
        await queryRunner.query(`DROP TABLE "user_group_rights"`);
        await queryRunner.query(`DROP TABLE "update"`);
        await queryRunner.query(`DROP TABLE "resource"`);
        await queryRunner.query(`DROP TABLE "read"`);
        await queryRunner.query(`DROP TABLE "delete"`);
        await queryRunner.query(`DROP TABLE "create"`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TABLE "loan_status"`);
        await queryRunner.query(`DROP TABLE "author"`);
    }

}
