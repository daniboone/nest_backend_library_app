import { Body, Controller, Delete, Get, Param, Post, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UsersService } from './users.service';
import { CreateProfileDto } from 'src/profile/dto/CreateProfile.dto';
import { CheckPolicies } from 'src/casl/decorator/police.decorator';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { Action } from 'src/enums/Action';
import { Acl } from 'src/casl/decorator/acl.decorator';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Post()
  @Public()
  create(@Body() userDto: UserDto, @Body() createProfileDto: CreateProfileDto): Promise<User> {
    return this.usersService.create(userDto, createProfileDto);
  }

  @Get()
  @ApiBearerAuth()
  @Acl(JwtAuthGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, User))
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @Acl(JwtAuthGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, User))
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @Acl(JwtAuthGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, User))
  async update(@Param('id') id: number, @Body() userDto: UserDto): Promise<User> {
    const userEdited = await this.usersService.update(id, userDto);
    return userEdited;
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Acl(JwtAuthGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, User))
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}