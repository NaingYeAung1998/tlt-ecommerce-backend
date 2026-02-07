import { Module } from '@nestjs/common';
import { OrderPaymentsService } from './order_payments.service';
import { OrderPaymentsController } from './order_payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderPayment } from './entities/order_payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderPayment])],
  controllers: [OrderPaymentsController],
  providers: [OrderPaymentsService],
})
export class OrderPaymentsModule { }
