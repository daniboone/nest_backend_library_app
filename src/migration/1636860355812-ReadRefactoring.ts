import { Read } from "src/read/read.entity";
import {MigrationInterface, QueryRunner} from "typeorm";

export class ReadRefactoring1636860355812 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const read1 = new Read();
        const read2 = new Read();
    
        read2.read = true;
        const reads = [read1, read2];

        await queryRunner.manager.save(reads);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`DELETE FROM "delete";`);
    }

}
