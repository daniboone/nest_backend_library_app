import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/CreateBook.dto';
import { UpdateBookDto } from './dto/UpdateBook.dto';

@Injectable()
export class BookService {
    
    constructor(
        @InjectRepository(Book)
        private readonly profileRepository: Repository<Book>,
    ) {}

    fillCreateDto(createBookDto: CreateBookDto){
        const book = new Book();

        book.etag = createBookDto.etag;
        book.kind = createBookDto.kind;

        return book;
    }

    
    async create(createBookDto: CreateBookDto): Promise<Book> {
        
        const book = this.fillCreateDto(createBookDto);

        return await this.profileRepository.save(book);
    }

    async findAll(): Promise<Book[]> {
        return await this.profileRepository.find();
    }

    async findOne(id: number): Promise<Book> {
        return await this.profileRepository.findOne(id);
    }

    async findByEtag(etag: string): Promise<Book | undefined> {
        return await this.profileRepository.findOne({etag});
    }

    async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
        const editedBook = await this.profileRepository.findOne(id);

        editedBook.etag = updateBookDto.etag;
        editedBook.kind = updateBookDto.kind;

        await this.profileRepository.save(editedBook);
        return editedBook;
    }

    async remove(id: number): Promise<void> {
        await this.profileRepository.delete(id);
    }
}
