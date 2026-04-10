import { forwardRef, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UtilityModule } from 'src/core/utility/utility.module';
import { OrderItemsModule } from '../order_items/order_items.module';
import { OrderPaymentsModule } from '../order_payments/order_payments.module';
import { StockModule } from '../stock/stock.module';
import { StockTrackModule } from '../stock_track/stock_track.module';
import { OrderTrackModule } from '../order-track/order-track.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), UtilityModule, OrderItemsModule, OrderPaymentsModule, forwardRef(() => StockModule), StockTrackModule, OrderTrackModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService]
})
export class OrderModule { }
