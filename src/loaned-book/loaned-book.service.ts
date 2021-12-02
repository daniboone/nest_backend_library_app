import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/book/book.entity';
import { LoanStatus } from 'src/loan-status/loan-status.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateLoanedBookDto } from './dto/CreateLoanedBook.dto';
import { UpdateLoanedBookDto } from './dto/UpdateLoanedBook.dto';
import { LoanedBook } from './loaned-book.entity';

@Injectable()
export class LoanedBookService {
    constructor(
        @InjectRepository(LoanedBook)
        private readonly loanedBookRepository: Repository<LoanedBook>,
    ) {}

    
    async create(createLoanedBookDto: CreateLoanedBookDto, req: any): Promise<LoanedBook> {
        
        const loanedBook = new LoanedBook();
        const book = new Book();
        const user = new User();
        const status = new LoanStatus();
        
        user.id = req.user.id;
        book.id = req.body.id;
        status.id = 1;
        const counter = await this.loanedBookRepository.count({
            where: {
                user: {id: user.id},
                loanStatus: {status_name: 'Loaned'} 
            },
            relations: ['loanStatus']
        });


        loanedBook.date_due = createLoanedBookDto.date_due;
        loanedBook.date_loaned = new Date();
        loanedBook.date_returned = createLoanedBookDto.date_returned;
        loanedBook.overdue_fine = createLoanedBookDto.overdue_fine;
        loanedBook.loanStatus = status;
        loanedBook.book = book;
        loanedBook.user = user;

        if(counter <= 2){
            return await this.loanedBookRepository.save(loanedBook);
        }else {
            throw new BadRequestException(null, "Max limit of 3 Loaned Books");
        }
    }

    async findAll(): Promise<LoanedBook[]> {
        return await this.loanedBookRepository.find();
    }

    async findOne(id: number): Promise<LoanedBook> {
        return await this.loanedBookRepository.findOne(id);
    }

    async update(id: number, updateBookDto: UpdateLoanedBookDto): Promise<LoanedBook> {
        const editedLoanedBook = await this.loanedBookRepository.findOne(id);
        const status = new LoanStatus();
        status.id = 2;

        if(editedLoanedBook.user.usergroup.groupname === 'Admin'){
            editedLoanedBook.date_due = updateBookDto.date_due;
            editedLoanedBook.date_loaned = updateBookDto.date_loaned;
            editedLoanedBook.overdue_fine = updateBookDto.overdue_fine;
        }
        editedLoanedBook.date_returned = new Date();
        editedLoanedBook.loanStatus = status;

        await this.loanedBookRepository.save(editedLoanedBook);
        return editedLoanedBook;
    }

    async remove(id: number): Promise<void> {
        await this.loanedBookRepository.delete(id);
    }
}
