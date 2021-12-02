import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { Acl } from 'src/casl/decorator/acl.decorator';
import { CheckPolicies } from 'src/casl/decorator/police.decorator';
import { Action } from 'src/enums/Action';
import { Book } from './book.entity';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/CreateBook.dto';

@Controller('book')
export class BookController {
    constructor(
        private readonly bookService: BookService
      ) {}
    
      @Post()
      @Public()
      create(@Body() createBookDto: CreateBookDto): Promise<Book> {
        return this.bookService.create(createBookDto);
      }
    
      @Get()
      @ApiBearerAuth()
      //@Acl(JwtAuthGuard)
      //@CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Book))
      findAll(): Promise<Book[]> {
        return this.bookService.findAll();
      }
    
      @Get(':id')
      @ApiBearerAuth()
      //@Acl(JwtAuthGuard)
      //@CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Book))
      findOne(@Param('id') id: number): Promise<Book> {
        return this.bookService.findOne(id);
      }
    
      @Patch(':id')
      @ApiBearerAuth()
      //@Acl(JwtAuthGuard)
      //@CheckPolicies((ability: AppAbility) => ability.can(Action.Update, Book))
      async update(@Param('id') id: number, @Body() createBookDto: CreateBookDto): Promise<Book> {
        const userEdited = await this.bookService.update(id, createBookDto);
        return userEdited;
      }
    
      @Delete(':id')
      @ApiBearerAuth()
      //@Acl(JwtAuthGuard)
      //@CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, Book))
      remove(@Param('id') id: number): Promise<void> {
        return this.bookService.remove(id);
      }
}
