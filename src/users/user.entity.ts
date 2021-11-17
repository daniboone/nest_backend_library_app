import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Profile } from 'src/profile/profile.entity';
import { UserGroup } from 'src/user-group/user-group.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true})
  username: string;

  @Column()
  password: string;

  @OneToOne(() => Profile, profile => profile.user,  {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE'
  }) // specify inverse side as a second parameter
  @JoinColumn()
  profile: Profile;

  @ManyToOne(() => UserGroup, userGroup => userGroup.users,{
    eager: true,
    cascade: true
  })
  usergroup: UserGroup;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compareSync(password, this.password);
  }
}