import { Injectable } from '@nestjs/common';
import { CreateOrderTrackDto } from './dto/create-order-track.dto';
import { UpdateOrderTrackDto } from './dto/update-order-track.dto';
import { Repository } from 'typeorm';
import { OrderTrack } from './entities/order-track.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderTrackService {
  constructor(
    @InjectRepository(OrderTrack)
    private orderTrackRepository: Repository<OrderTrack>
  ) { }
  create(createOrderTrackDto: CreateOrderTrackDto) {
    return this.orderTrackRepository.save(createOrderTrackDto);
  }

  createBatch(createOrderTrackDto: CreateOrderTrackDto[]) {
    return this.orderTrackRepository.save(createOrderTrackDto);
  }

  findAll() {
    return `This action returns all orderTrack`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderTrack`;
  }

  update(id: number, updateOrderTrackDto: UpdateOrderTrackDto) {
    return `This action updates a #${id} orderTrack`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderTrack`;
  }

  removeBatch(orderTracks: OrderTrack[]) {
    return this.orderTrackRepository.remove(orderTracks);
  }
}
