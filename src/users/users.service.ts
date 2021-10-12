import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async update(id: number, createUserDto: CreateUserDto): Promise<User> {
    const editedUser = await this.usersRepository.findOne(id);
    if (!editedUser) {
      throw new NotFoundException('User not found');
    }
    editedUser.firstName = createUserDto.firstName;
    editedUser.lastName = createUserDto.lastName;
    await this.usersRepository.save(editedUser);
    return editedUser;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}