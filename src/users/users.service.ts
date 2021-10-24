import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfileDto } from 'src/profile/dto/CreateProfile.dto';
import { ProfileService } from 'src/profile/profile.service';
import { Connection, Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private profileService: ProfileService,
    private connection: Connection
  ) {}

  async create(userDto: UserDto, createProfileDto: CreateProfileDto): Promise<User> {
    const user = new User();
    user.username = userDto.username;
    user.password = userDto.password;
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {

      user.profile = this.profileService.fillCreateDto(createProfileDto);
      
      //await queryRunner.manager.save(user);
      await this.usersRepository.save(user);
      await queryRunner.commitTransaction();
      return user;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(null, error.detail);
    } finally{
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }

  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  async findByName(username: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({username});
  }

  async update(id: number, userDto: UserDto): Promise<User> {
    const editedUser = await this.usersRepository.findOne(id);
    if (!editedUser) {
      throw new NotFoundException('User not found');
    }
    editedUser.username = userDto.username;
    editedUser.password = userDto.password;
    await this.usersRepository.save(editedUser);
    return editedUser;
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}