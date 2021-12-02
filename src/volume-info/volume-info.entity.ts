import { Author } from "src/authors/author.entity";
import { Book } from "src/book/book.entity";
import { Category } from "src/categories/category.entity";
import { ImageLink } from "src/image-links/image-link.entity";
import { IndustryIdentifier } from "src/industry-identifiers/industry-identifiers.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class VolumeInfo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    title: string;

    @Column({nullable: true})
    subtitle: string;

    @Column({nullable: true})
    publisher: string;

    @Column({nullable: true})
    publishedDate: Date;

    @Column({nullable: true})
    description: string;

    @Column({nullable: true})
    language: string;

    @ManyToMany(() => Author,  {
        eager: true,
        cascade: true,
        onDelete: 'CASCADE'
    })
    @JoinTable()
    authors: Author[];

    @ManyToMany(() => Category,  {
        eager: true,
        cascade: true,
        onDelete: 'CASCADE'
    })
    @JoinTable()
    categories: Category[];

    @ManyToMany(() => IndustryIdentifier,  {
        eager: true,
        cascade: true,
        onDelete: 'CASCADE'
    })
    @JoinTable()
    industryIdentifiers: IndustryIdentifier[];

    @OneToOne(() => ImageLink , imageLink => imageLink.volumeInfo,  {
        eager: true,
        cascade: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn()
    imageLink: ImageLink;

    @OneToOne(() => Book, book => book.volumeInfo) // specify inverse side as a second parameter
    book: Book;

}