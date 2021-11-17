import { UserGroupRights } from 'src/user-group-rights/user-group-rights.entity';
import {  Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Create {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  create: boolean;
  
  @OneToMany(() => UserGroupRights, userGroupRights => userGroupRights.create)
  userGroupRights: UserGroupRights[];

}