import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderTrackService } from './order-track.service';
import { CreateOrderTrackDto } from './dto/create-order-track.dto';
import { UpdateOrderTrackDto } from './dto/update-order-track.dto';

@Controller('order-track')
export class OrderTrackController {
  constructor(private readonly orderTrackService: OrderTrackService) {}

  @Post()
  create(@Body() createOrderTrackDto: CreateOrderTrackDto) {
    return this.orderTrackService.create(createOrderTrackDto);
  }

  @Get()
  findAll() {
    return this.orderTrackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderTrackService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderTrackDto: UpdateOrderTrackDto) {
    return this.orderTrackService.update(+id, updateOrderTrackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderTrackService.remove(+id);
  }
}
