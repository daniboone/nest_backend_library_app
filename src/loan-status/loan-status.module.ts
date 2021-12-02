import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanStatus } from './loan-status.entity';
import { LoanStatusService } from './loan-status.service';
import { LoanStatusController } from './loan-status.controller';

@Module({
    imports: [TypeOrmModule.forFeature([LoanStatus])],
    providers: [LoanStatusService],
    controllers: [LoanStatusController]
})
export class LoanStatusModule {}
