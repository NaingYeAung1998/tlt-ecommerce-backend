import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Stock')
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) { }

  @Post()
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockService.create(createStockDto);
  }

  @Get()
  findAll(@Query() query: { search: string, currentPage: number, perPage: number }) {
    return this.stockService.findAll(query.search, query.currentPage, query.perPage);
  }

  @Get('/getByProduct')
  findByProduct(@Query() query: { product_id: string, search: string, currentPage: number, perPage: number }) {
    return this.stockService.findByProduct(query.product_id, query.search, query.currentPage, query.perPage);
  }

  @Get('/getBySupplier')
  findBySupplier(@Query() query: { supplier_id: string, search: string }) {
    return this.stockService.findBySuppleir(query.supplier_id, query.search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.update(id, updateStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockService.remove(+id);
  }
}
