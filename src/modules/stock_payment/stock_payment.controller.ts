import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StockPaymentService } from './stock_payment.service';
import { CreateStockPaymentDto } from './dto/create-stock_payment.dto';
import { UpdateStockPaymentDto } from './dto/update-stock_payment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Stock')
@Controller('stock/payment')
export class StockPaymentController {
  constructor(private readonly stockPaymentService: StockPaymentService) { }

  @Post()
  create(@Body() createStockPaymentDto: CreateStockPaymentDto) {
    return this.stockPaymentService.create(createStockPaymentDto);
  }

  @Get()
  findAll(@Query() query: { search: string, currentPage: number, perPage: number }) {
    return this.stockPaymentService.findAll(query.search, query.currentPage, query.perPage);
  }

  @Get('/getByStock')
  findByProduct(@Query() query: { stock_id: string, search: string, currentPage: number, perPage: number }) {
    return this.stockPaymentService.findByStock(query.stock_id, query.search, query.currentPage, query.perPage);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockPaymentService.findOne(id);
  }

  @Get('/getInfo/:id')
  findInfo(@Param('id') id: string) {
    return this.stockPaymentService.getStockPaymentInfo(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockPaymentDto: UpdateStockPaymentDto) {
    return this.stockPaymentService.update(id, updateStockPaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockPaymentService.remove(+id);
  }
}
