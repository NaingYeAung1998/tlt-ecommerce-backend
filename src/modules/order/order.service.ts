import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { UtilityService } from 'src/core/utility/utility.service';
import { CUSTOMER_VOUCHER_INITIALS } from 'src/core/constants';
import { OrderListDto } from './dto/order-list.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private utilityService: UtilityService
  ) { }
  async create(createOrderDto: CreateOrderDto) {
    try {
      let orderCount = await this.orderRepository.count();
      createOrderDto.voucher_code = this.utilityService.formatAutoIncrementCode(CUSTOMER_VOUCHER_INITIALS, orderCount)
      return this.orderRepository.save(createOrderDto);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(search: string, currentPage: number, perPage: number) {
    let data: OrderListDto[] = await this.orderRepository.createQueryBuilder("customer_order")
      .select("customer_order.*")
      .addSelect("order_items.selling_amount", "total_amount")
      .addSelect("SUM(order_payment.amount)", "total_paid")
      .addSelect("COUNT(DISTINCT customer_order.order_id)", "count")
      .addSelect("customer.customer_name", "customer_relation_name")
      .leftJoin("customer_order.customer", "customer")
      .leftJoin("customer_order.payments", "order_payment")
      .leftJoin(subQuery => {
        return subQuery
          .select('customer_order.order_id', "order_id")
          .addSelect('SUM(order_item.selling_price)', 'selling_amount')
          .from("order", "customer_order")
          .leftJoin("customer_order.items", "order_item")
          .groupBy('order_id');
      }, "order_items", "customer_order.order_id = order_items.order_id")
      .groupBy("customer_order.order_id, customer_relation_name, total_amount")
      .skip(currentPage * perPage)
      .take(perPage)
      .getRawMany()
    let totalLength = data[0] ? data[0].count : 0
    return this.utilityService.createPaginationList(data, currentPage, perPage, totalLength)
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
