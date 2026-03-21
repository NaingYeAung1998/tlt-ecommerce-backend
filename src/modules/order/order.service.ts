import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { UtilityService } from 'src/core/utility/utility.service';
import { CUSTOMER_VOUCHER_INITIALS } from 'src/core/constants';
import { OrderListDto } from './dto/order-list.dto';
import { OrderItemsService } from '../order_items/order_items.service';
import { OrderPaymentsService } from '../order_payments/order_payments.service';
import { CreateStockTrackDto } from '../stock_track/dto/create-stock_track.dto';
import { StockTrackStatus } from '../stock_track/entities/stock_track.entity';
import { StockTrackService } from '../stock_track/stock_track.service';
import { StockService } from '../stock/stock.service';
import { StockTrackInfoDto } from '../stock_track/dto/stock_track-list.dto';
import { OrderItemStock } from '../order_items/entities/order_item.entity';
import { CreateOrderItemStockDto } from '../order_items/dto/create-order_item.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private utilityService: UtilityService,
    private orderItemService: OrderItemsService,
    private orderPaymentService: OrderPaymentsService,
    private stockService: StockService,
    private stockTrackService: StockTrackService
  ) { }
  async create(createOrderDto: CreateOrderDto) {
    try {
      let orderCount = await this.orderRepository.count();
      createOrderDto.voucher_code = this.utilityService.formatAutoIncrementCode(CUSTOMER_VOUCHER_INITIALS, orderCount)
      let stockTracks: CreateStockTrackDto[] = [];
      let orderItemStocks: CreateOrderItemStockDto[] = [];
      const orderItemPromises = createOrderDto.items.map(async (item) => {
        if (item.quantity > 0) {
          let remainingQuantity = item.quantity;
          let availableStocks = await this.stockService.findAll("", 0, -1, item.product.product_id, null, true, 'ASC');
          if (availableStocks instanceof Array) {
            item.itemStocks = [];
            for (let i = 0; i < availableStocks.length; i++) {
              let stock: StockTrackInfoDto = availableStocks[i];
              stock.total_available = (parseFloat(stock.total_stored.toString()) + parseFloat(stock.total_received.toString())) - (parseFloat(stock.total_sold.toString()) + parseFloat(stock.total_transferred.toString()))
              let stockTrack = new CreateStockTrackDto();
              stockTrack.unit = item.unit;
              stockTrack.checked_date = createOrderDto.order_date;
              stockTrack.stock = { stock_id: stock.stock_id };
              stockTrack.status = StockTrackStatus.SOLD

              let itemStock = new CreateOrderItemStockDto();
              itemStock.stock = { stock_id: stock.stock_id };
              itemStock.unit = item.unit;
              itemStock.order_item = item;
              if (stock.total_available >= remainingQuantity) {
                stockTrack.quantity = remainingQuantity;
                stockTracks.push(stockTrack)
                itemStock.quantity = remainingQuantity;
                orderItemStocks.push(itemStock);
                break;
              }
              else {
                stockTrack.quantity = stock.total_available;
                stockTracks.push(stockTrack);
                itemStock.quantity = stock.total_available;
                orderItemStocks.push(itemStock);
                remainingQuantity = remainingQuantity - stock.total_available
              }

            }
          }
          console.log("remaing", remainingQuantity)
          item.missing_quantity = remainingQuantity
        }

      })
      await Promise.all(orderItemPromises);
      await this.orderRepository.save(createOrderDto);
      await this.stockTrackService.createBatch(stockTracks);
      return await this.orderItemService.createOrderItemStockBatch(orderItemStocks);
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
      .where("customer_order.is_delete = :isDelete", { isDelete: false })
      .orderBy("customer_order.updated_on", 'DESC')
      .skip(currentPage * perPage)
      .take(perPage)
      .getRawMany()
    let totalLength = data[0] ? data[0].count : 0
    return this.utilityService.createPaginationList(data, currentPage, perPage, totalLength)
  }

  findOne(id: string) {
    return this.orderRepository.findOne({ where: { order_id: id }, relations: ['items', 'customer', 'payments', 'items.product', 'items.unit', 'items.itemStocks'] });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    let order = await this.findOne(id);
    if (!order) {
      throw new HttpException('Cannot find order', HttpStatus.BAD_REQUEST)
    }
    await this.orderPaymentService.removeBatch(order.payments);
    await this.orderItemService.removeBatch(order.items);
    order.payments = updateOrderDto.payments;
    order.items = updateOrderDto.items
    return this.orderRepository.save(order);
  }

  async remove(id: string) {
    let order = await this.findOne(id);
    if (!order) {
      throw new HttpException('Cannot find order', HttpStatus.BAD_REQUEST)
    }
    order.is_delete = true;
    return this.orderRepository.save(order);
  }
}
