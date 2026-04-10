import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto, CreateOrderItemStockDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';
import { OrderItem, OrderItemStock } from './entities/order_item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(OrderItemStock)
    private orderItemStockRepository: Repository<OrderItemStock>
  ) { }
  create(createOrderItemDto: CreateOrderItemDto) {
    return 'This action adds a new orderItem';
  }

  findAll() {
    return `This action returns all orderItems`;
  }

  async findByOrder(id: string) {
    return this.orderItemRepository.find({ where: { order: { order_id: id } }, relations: ['product', 'unit', 'product.per_bag_unit'] });
  }

  async findOne(id: string) {
    return this.orderItemRepository.findOne({ where: { order_item_id: id } });
  }

  update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    return `This action updates a #${id} orderItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderItem`;
  }

  removeBatch(items: OrderItem[]) {
    return this.orderItemRepository.remove(items);
  }

  createOrderItemStockBatch(itemStocks: CreateOrderItemStockDto[]) {
    return this.orderItemStockRepository.save(itemStocks);
  }

  async updateMissingQuantity(id: string, quantity: number) {
    let item = await this.findOne(id)
    if (item) {
      item.missing_quantity = item.missing_quantity - quantity;
      this.orderItemRepository.save(item);
    }
  }
}
