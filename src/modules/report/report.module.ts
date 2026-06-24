import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { UtilityModule } from 'src/core/utility/utility.module';

@Module({
  imports: [UtilityModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule { }
