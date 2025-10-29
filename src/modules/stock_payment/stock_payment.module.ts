import { Module } from '@nestjs/common';
import { StockPaymentService } from './stock_payment.service';
import { StockPaymentController } from './stock_payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockPayment } from './entities/stock_payment.entity';
import { UtilityModule } from 'src/core/utility/utility.module';

@Module({
  imports: [TypeOrmModule.forFeature([StockPayment]), UtilityModule],
  controllers: [StockPaymentController],
  providers: [StockPaymentService],
})
export class StockPaymentModule { }
