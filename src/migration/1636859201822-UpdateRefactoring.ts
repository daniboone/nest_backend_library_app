import { Update } from "src/update/update.entity";
import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateRefactoring1636859201822 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const update1 = new Update();
        const update2 = new Update();
    
        update2.update = true;
        const updates = [update1, update2];

        await queryRunner.manager.save(updates);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`DELETE FROM "update";`);
    }

}
