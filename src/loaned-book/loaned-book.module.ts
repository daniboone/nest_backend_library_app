import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanedBook } from './loaned-book.entity';
import { LoanedBookService } from './loaned-book.service';
import { LoanedBookController } from './loaned-book.controller';
import { CaslModule } from 'src/casl/casl.module';

@Module({
    imports: [TypeOrmModule.forFeature([LoanedBook]), CaslModule],
    providers: [LoanedBookService],
    controllers: [LoanedBookController]
})
export class LoanedBookModule {}
