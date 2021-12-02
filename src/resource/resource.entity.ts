import { UserGroupRights } from 'src/user-group-rights/user-group-rights.entity';
import {  Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Resource {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, default: 'User' })
  resourcename: string;

  @OneToMany(() => UserGroupRights, userGroup => userGroup.resources)
  usergrouprights: UserGroupRights[];

}