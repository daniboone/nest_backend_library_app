import { UserGroupRights } from 'src/user-group-rights/user-group-rights.entity';
import {  Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Update {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  update: boolean;
  
  @OneToMany(() => UserGroupRights, userGroupRights => userGroupRights.update)
  userGroupRights: UserGroupRights[];

}