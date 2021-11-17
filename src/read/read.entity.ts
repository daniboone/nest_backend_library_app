import { UserGroupRights } from 'src/user-group-rights/user-group-rights.entity';
import {  Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Read {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  read: boolean;
  
  @OneToMany(() => UserGroupRights, userGroupRights => userGroupRights.read)
  userGroupRights: UserGroupRights[];

}