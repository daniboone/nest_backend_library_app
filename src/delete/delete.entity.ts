import { UserGroupRights } from 'src/user-group-rights/user-group-rights.entity';
import {  Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Delete {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  delete: boolean;
  
  @OneToMany(() => UserGroupRights, userGroupRights => userGroupRights.delete)
  userGroupRights: UserGroupRights[];

}