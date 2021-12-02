import {MigrationInterface, QueryRunner} from "typeorm";
import axios from "axios";
import { Book } from "src/book/book.entity";
import { Category } from "src/categories/category.entity";
import { ImageLink } from "src/image-links/image-link.entity";
import { VolumeInfo } from "src/volume-info/volume-info.entity";
import { IndustryIdentifier } from "src/industry-identifiers/industry-identifiers.entity";
import { Author } from "src/authors/author.entity";
import { LoanStatus } from "src/loan-status/loan-status.entity";
import { LoanedBook } from "src/loaned-book/loaned-book.entity";
import { User } from "src/users/user.entity";

export class FillBookMigration1637359172820 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const res = await axios.get('https://www.googleapis.com/books/v1/volumes?q=juvenile novel'); 
        const data = await res.data;
        const books = [];
        const categories = [];
        const images = [];
        const volumes = [];
        const industryIdentifiers = [];
        const authors = [];
        const loaned_books = [];
        let mySet = null;

        const status = new LoanStatus();
        const status2 = new LoanStatus();
        status.status_name = 'Loaned';
        status2.status_name = 'Returned';
        const user = new User();
        user.id = 1;

        data.items.map((d) => {
            const book = new Book();
            const cat = [];
            const industry = [];
            const temp = [];
            book.etag = d.etag;
            book.kind = d.kind;
            
            mySet = new Set(d.volumeInfo.authors);
            mySet.forEach(a =>{
                const author = new Author();
                author.author = a;
                temp.push(author);
                authors.push(author);
            })

            mySet = new Set(d.volumeInfo.categories);
            mySet.forEach(c => {
                const category = new Category();
                category.name = c;
                cat.push(category);
                categories.push(category);
            })

            mySet = new Set(d.volumeInfo.industryIdentifiers);
            mySet.forEach(i => {
                const ind = new IndustryIdentifier()
                ind.type = i.type;
                ind.identifier = i.identifier;
                industry.push(ind);
                industryIdentifiers.push(ind);
            })

            const image = new ImageLink();
            image.smallThumbnail = d.volumeInfo.imageLinks.smallThumbnail;
            image.thumbnail = d.volumeInfo.imageLinks.thumbnail;
            image.small = d.volumeInfo.imageLinks.small;
            image.medium = d.volumeInfo.imageLinks.medium;
            image.large = d.volumeInfo.imageLinks.large;
            image.extraLarge = d.volumeInfo.imageLinks.extraLarge;

            images.push(image);

            const volumeInfo = new VolumeInfo();

            volumeInfo.title = d.volumeInfo.title;
            volumeInfo.subtitle = d.volumeInfo.subtitle;
            volumeInfo.publisher = d.volumeInfo.publisher;
            volumeInfo.publishedDate = d.volumeInfo.publishedDate;
            volumeInfo.language = d.volumeInfo.language;
            volumeInfo.description = d.volumeInfo.description;
            volumeInfo.imageLink = image;

            volumeInfo.categories = cat;
            volumeInfo.authors = temp;
            
            volumeInfo.industryIdentifiers = industry;

            volumes.push(volumeInfo);
            book.volumeInfo = volumeInfo;
            books.push(book);

            const loaned_book = new LoanedBook();
            loaned_book.book = book;
            loaned_book.date_due = new Date();
            loaned_book.date_loaned = new Date();
            loaned_book.date_returned = new Date();
            loaned_book.overdue_fine = 10;
            loaned_book.loanStatus = status;
            loaned_book.user = user;

            loaned_books.push(loaned_book);

        })
        
        await queryRunner.manager.save(categories);
        await queryRunner.manager.save(authors);
        await queryRunner.manager.save(industryIdentifiers);
        await queryRunner.manager.save(images);
        await queryRunner.manager.save([status, status2]);
        await queryRunner.manager.save(volumes);
        await queryRunner.manager.save(books);
        await queryRunner.manager.save(loaned_books);
         
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
