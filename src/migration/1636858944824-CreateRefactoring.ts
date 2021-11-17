import { Create } from "src/create/create.entity";
import { MigrationInterface, QueryRunner} from "typeorm";

export class CreateRefactoring1636858944824 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       
        const create1 = new Create();
        const create2 = new Create();
        
        create2.create = true;
        const creates = [create1, create2];

        await queryRunner.manager.save(creates);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`DELETE FROM "create";`);
    }

}
