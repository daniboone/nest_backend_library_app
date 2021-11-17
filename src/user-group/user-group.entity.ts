import { UserGroupRights } from 'src/user-group-rights/user-group-rights.entity';
import { User } from 'src/users/user.entity';
import {  Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, default: 'user' })
  groupname: string;

  @OneToMany(() => User, user => user.usergroup)
  users: User[];
  
  @OneToMany(() => UserGroupRights, userGroupRights => userGroupRights.usergroup,{
    eager: true,
    cascade: true
  })
  userGroupRights: UserGroupRights[];

}