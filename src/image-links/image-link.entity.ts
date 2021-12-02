import { VolumeInfo } from 'src/volume-info/volume-info.entity';
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ImageLink {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  smallThumbnail: string;

  @Column({nullable: true})
  thumbnail: string;

  @Column({nullable: true})
  small: string;

  @Column({nullable: true})
  medium: string;

  @Column({nullable: true})
  large: string;

  @Column({nullable: true})
  extraLarge: string;

  @OneToOne(() => VolumeInfo, volumeInfo => volumeInfo.imageLink)
  volumeInfo: VolumeInfo[];

}