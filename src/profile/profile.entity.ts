import { User } from "src/users/user.entity";
import {Entity, PrimaryGeneratedColumn, Column, OneToOne} from "typeorm";

@Entity()
export class Profile {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    address: string;

    @Column({ unique: true })
    email_address: string;

    @Column()
    phone_number: string;

    @Column({ nullable: true })
    photo: string;

    @OneToOne(() => User, user => user.profile) // specify inverse side as a second parameter
    user: User;

}