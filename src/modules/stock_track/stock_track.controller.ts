import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StockTrackService } from './stock_track.service';
import { CreateStockTrackDto } from './dto/create-stock_track.dto';
import { UpdateStockTrackDto } from './dto/update-stock_track.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Stock')
@Controller('stock/track')
export class StockTrackController {
  constructor(private readonly stockTrackService: StockTrackService) { }

  @Post()
  create(@Body() createStockTrackDto: CreateStockTrackDto) {
    return this.stockTrackService.create(createStockTrackDto);
  }

  @Get()
  findAll(@Query() query: { search: string, currentPage: number, perPage: number }) {
    return this.stockTrackService.findAll(query.search, query.currentPage, query.perPage);
  }

  @Get('/getByStock')
  findByProduct(@Query() query: { stock_id: string, search: string, currentPage: number, perPage: number }) {
    return this.stockTrackService.findByStock(query.stock_id, query.search, query.currentPage, query.perPage);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockTrackService.findOne(id);
  }

  @Get('/getInfo/:id')
  findInfo(@Param('id') id: string) {
    return this.stockTrackService.getStockTrackInfo(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockTrackDto: UpdateStockTrackDto) {
    return this.stockTrackService.update(id, updateStockTrackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockTrackService.remove(+id);
  }
}
