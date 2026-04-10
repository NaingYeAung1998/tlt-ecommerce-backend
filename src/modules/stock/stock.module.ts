import { forwardRef, Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { UtilityModule } from 'src/core/utility/utility.module';
import { StockTrackModule } from '../stock_track/stock_track.module';
import { OrderModule } from '../order/order.module';
import { ProductModule } from '../product/product.module';
import { OrderItemsModule } from '../order_items/order_items.module';

@Module({
  imports: [TypeOrmModule.forFeature([Stock]), UtilityModule, forwardRef(() => StockTrackModule), forwardRef(() => OrderModule), ProductModule, OrderItemsModule],
  controllers: [StockController],
  providers: [StockService],
  exports: [StockService]
})
export class StockModule { }
