import { Delete } from "src/delete/delete.entity";
import {MigrationInterface, QueryRunner} from "typeorm";

export class DeleteRefactoring1636859445893 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const delete1 = new Delete();
        const delete2 = new Delete();
    
        delete2.delete = true;
        const deletes = [delete1, delete2];

        await queryRunner.manager.save(deletes);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`DELETE FROM "delete";`);
    }

}
