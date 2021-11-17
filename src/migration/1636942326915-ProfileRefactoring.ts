import { Profile } from "src/profile/profile.entity";
import {MigrationInterface, QueryRunner} from "typeorm";

export class ProfileRefactoring1636942326915 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const profile = new Profile();

        profile.name = "john";
        profile.surname = "doe";
        profile.address = "evergreen av 17";
        profile.email_address = "john@gmail.com";
        profile.phone_number = "5510957010";
    
        await queryRunner.manager.save(profile);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
