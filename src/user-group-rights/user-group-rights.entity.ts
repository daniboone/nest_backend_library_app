import { Create } from 'src/create/create.entity';
import { Delete } from 'src/delete/delete.entity';
import { Read } from 'src/read/read.entity';
import { Resource } from 'src/resource/resource.entity';
import { Update } from 'src/update/update.entity';
import { UserGroup } from 'src/user-group/user-group.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserGroupRights {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserGroup, userGroup => userGroup.userGroupRights)
  usergroup: UserGroup;

  @ManyToOne(() => Resource, user => user.usergrouprights,  {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE'
  })
  resources: Resource;

  @ManyToOne(() => Create , create => create.userGroupRights,  {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE'
  }) // specify inverse side as a second parameter
  create: Create;

  @ManyToOne(() => Read , read => read.userGroupRights,  {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE'
  }) // specify inverse side as a second parameter
  read: Read;

  @ManyToOne(() => Update , update => update.userGroupRights,  {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE'
  }) // specify inverse side as a second parameter
  update: Update;

  @ManyToOne(() => Delete , d => d.userGroupRights,  {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE'
  }) // specify inverse side as a second parameter
  delete: Delete;

}