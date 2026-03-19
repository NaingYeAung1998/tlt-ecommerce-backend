import { Injectable } from '@nestjs/common';
import { CreateOrderPaymentDto } from './dto/create-order_payment.dto';
import { UpdateOrderPaymentDto } from './dto/update-order_payment.dto';
import { OrderPayment } from './entities/order_payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderPaymentsService {
  constructor(
    @InjectRepository(OrderPayment)
    private orderItemRepository: Repository<OrderPayment>,
  ) { }
  create(createOrderPaymentDto: CreateOrderPaymentDto) {
    return 'This action adds a new orderPayment';
  }

  findAll() {
    return `This action returns all orderPayments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderPayment`;
  }

  update(id: number, updateOrderPaymentDto: UpdateOrderPaymentDto) {
    return `This action updates a #${id} orderPayment`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderPayment`;
  }

  removeBatch(items: OrderPayment[]) {
    return this.orderItemRepository.remove(items);
  }
}
