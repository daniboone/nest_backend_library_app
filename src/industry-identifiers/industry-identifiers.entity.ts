import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class IndustryIdentifier {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    identifier: string;

}