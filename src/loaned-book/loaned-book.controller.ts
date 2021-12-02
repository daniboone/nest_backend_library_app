import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { Acl } from 'src/casl/decorator/acl.decorator';
import { CheckPolicies } from 'src/casl/decorator/police.decorator';
import { Action } from 'src/enums/Action';
import { CreateLoanedBookDto } from './dto/CreateLoanedBook.dto';
import { UpdateLoanedBookDto } from './dto/UpdateLoanedBook.dto';
import { LoanedBook } from './loaned-book.entity';
import { LoanedBookService } from './loaned-book.service';

@Controller('loaned-book')
export class LoanedBookController {
    constructor(
        private readonly loanedBookService: LoanedBookService
      ) {}
    
      @Post()
      @UseGuards(JwtAuthGuard)
      create(@Body() createloanedBookDto: CreateLoanedBookDto,@Req() req: any ): Promise<LoanedBook> {
        return this.loanedBookService.create(createloanedBookDto, req);
      }
    
      @Get()
      @ApiBearerAuth()
      @Acl(JwtAuthGuard)
      @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, LoanedBook))
      findAll(): Promise<LoanedBook[]> {
        return this.loanedBookService.findAll();
      }
    
      @Get(':id')
      @ApiBearerAuth()
      @Acl(JwtAuthGuard)
      @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, LoanedBook))
      findOne(@Param('id') id: number): Promise<LoanedBook> {
        return this.loanedBookService.findOne(id);
      }
    
      @Patch(':id')
      @ApiBearerAuth()
      @Acl(JwtAuthGuard)
      @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, LoanedBook))
      async update(@Param('id') id: number, @Body() updateLoanedBookDto: UpdateLoanedBookDto): Promise<LoanedBook> {
        const userEdited = await this.loanedBookService.update(id, updateLoanedBookDto);
        return userEdited;
      }
    
      @Delete(':id')
      @ApiBearerAuth()
      @Acl(JwtAuthGuard)
      @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, LoanedBook))
      remove(@Param('id') id: number): Promise<void> {
        return this.loanedBookService.remove(id);
      }
}
