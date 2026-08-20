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

  @Get('/daily-sales-summary')
  getDailySalesSummary(@Query() query: { date: string, customerId?: string }) {
    return this.reportService.getDailySalesSummary(query.date, query.customerId);
  }

  @Get('/product-sales')
  getProductSales(@Query() query: {
    fromDate: string,
    toDate: string,
    categoryId?: string,
    productId?: string,
    sortBy?: 'best-sellers' | 'slow-movers',
    currentPage?: number,
    perPage?: number
  }) {
    return this.reportService.getProductSalesReport(query);
  }

  @Get('/inventory')
  getInventoryReport(@Query() query: {
    warehouseId?: string,
    categoryId?: string,
    productId?: string,
    supplierId?: string,
    sortBy?: 'code' | 'highest' | 'lowest',
    currentPage?: number,
    perPage?: number
  }) {
    return this.reportService.getInventoryReport(query);
  }
}
