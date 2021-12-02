import { LoanedBook } from 'src/loaned-book/loaned-book.entity';
import {  Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LoanStatus {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status_name: string;
  
  @OneToMany(() => LoanedBook, loanedBook => loanedBook.loanStatus)
  loanedBook: LoanedBook[];

}