import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderTrackDto } from '../order-track/dto/create-order-track.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll(@Query() query: { search: string, currentPage: number, perPage: number }) {
    return this.orderService.findAll(query.search, query.currentPage, query.perPage);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Patch('payments/:id')
  updatePayment(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.updatePayments(id, updateOrderDto);
  }

  @Patch('tracks/:id')
  updateTracks(@Param('id') id: string, @Body() createOrderTrackDto: CreateOrderTrackDto[]) {
    return this.orderService.updateTracks(id, createOrderTrackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
