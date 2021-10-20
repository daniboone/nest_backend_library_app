import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileDto } from 'src/profile/dto/profile.dto';
import { ProfileService } from 'src/profile/profile.service';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private profileService: ProfileService
    
  ) {}

  create(userDto: UserDto, profileDto: ProfileDto): Promise<User> {
    const user = new User();
    user.username = userDto.username;
    user.password = userDto.password;
    
    this.profileService.create(profileDto)
      .then(res => user.profile = res)
      .catch(err => console.error(err));  

    return this.usersRepository.save(user);
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