import { Module } from '@nestjs/common';
import { OrderItemsService } from './order_items.service';
import { OrderItemsController } from './order_items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem, OrderItemStock } from './entities/order_item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem]), TypeOrmModule.forFeature([OrderItemStock])],
  controllers: [OrderItemsController],
  providers: [OrderItemsService],
  exports: [OrderItemsService]
})
export class OrderItemsModule { }
