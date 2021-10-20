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

    @Column()
    email_address: string;

    @Column()
    phone_number: string;

    @Column()
    photo: string;

    @OneToOne(() => User, user => user.profile) // specify inverse side as a second parameter
    user: User;

}