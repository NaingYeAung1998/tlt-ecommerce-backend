import { Module } from '@nestjs/common';
import { SupplierVoucherPaymentsService } from './supplier_voucher_payments.service';
import { SupplierVoucherPaymentsController } from './supplier_voucher_payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierVoucherPayment } from './entities/supplier_voucher_payment.entity';
import { UtilityModule } from 'src/core/utility/utility.module';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierVoucherPayment]), UtilityModule],
  controllers: [SupplierVoucherPaymentsController],
  providers: [SupplierVoucherPaymentsService],
  exports: [SupplierVoucherPaymentsService]
})
export class SupplierVoucherPaymentsModule { }
