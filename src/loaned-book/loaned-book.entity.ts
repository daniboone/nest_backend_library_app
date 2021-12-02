import { Book } from 'src/book/book.entity';
import { LoanStatus } from 'src/loan-status/loan-status.entity';
import { User } from 'src/users/user.entity';
import {  Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LoanedBook {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date_loaned: Date;

  @Column()
  date_due: Date;

  @Column()
  date_returned: Date;

  @Column({type: 'numeric', nullable: true})
  overdue_fine: number;
  
  @ManyToOne(() => LoanStatus , loanStatus => loanStatus.loanedBook,  {
    eager: true,
    cascade: true
  }) // specify inverse side as a second parameter
  loanStatus: LoanStatus;

  @ManyToOne(() => Book , book => book.loanedBook,  {
    eager: true,
    cascade: true
  }) // specify inverse side as a second parameter
  book: Book;

  @ManyToOne(() => User , user => user.loanedBook,  {
    eager: true,
    cascade: true
  }) // specify inverse side as a second parameter
  user: User;

}