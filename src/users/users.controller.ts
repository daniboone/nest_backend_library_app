import { Body, Controller, Delete, Get, Param, Post, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UsersService } from './users.service';
import { CreateProfileDto } from 'src/profile/dto/CreateProfile.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() userDto: UserDto, @Body() createProfileDto: CreateProfileDto): Promise<User> {
    return this.usersService.create(userDto, createProfileDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() userDto: UserDto): Promise<User> {
    const userEdited = await this.usersService.update(id, userDto);
    return userEdited;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}