import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) { }

  @Get('/getStockReport')
  getStockReport(@Query() query: { search: string, currentPage: number, perPage: number }) {
    return this.reportService.getStockReport('', query.currentPage, query.perPage);
  }
}
