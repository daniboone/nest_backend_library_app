import { LoanedBook } from 'src/loaned-book/loaned-book.entity';
import { VolumeInfo } from 'src/volume-info/volume-info.entity';
import {  Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  kind: string;

  @Column()
  etag: string;

  @OneToMany(() => LoanedBook, loanedBook => loanedBook.book)
  loanedBook: LoanedBook[];

  @OneToOne(() => VolumeInfo, volumeInfo => volumeInfo.book,  {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE'
  }) // specify inverse side as a second parameter
  @JoinColumn()
  volumeInfo: VolumeInfo;

}