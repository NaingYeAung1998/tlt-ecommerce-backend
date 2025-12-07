import { Module } from '@nestjs/common';
import { SupplierVoucherService } from './supplier_voucher.service';
import { SupplierVoucherController } from './supplier_voucher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierVoucher } from './entities/supplier_voucher.entity';
import { UtilityModule } from 'src/core/utility/utility.module';
import { SupplierVoucherPaymentsModule } from 'src/modules/supplier_voucher_payments/supplier_voucher_payments.module';
import { SupplierVoucherStocksModule } from 'src/modules/supplier_voucher_stocks/supplier_voucher_stocks.module';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierVoucher]), UtilityModule, SupplierVoucherPaymentsModule, SupplierVoucherStocksModule],
  controllers: [SupplierVoucherController],
  providers: [SupplierVoucherService],
})
export class SupplierVoucherModule { }
