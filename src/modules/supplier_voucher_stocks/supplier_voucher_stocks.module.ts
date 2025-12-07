import { Module } from '@nestjs/common';
import { SupplierVoucherStocksService } from './supplier_voucher_stocks.service';
import { SupplierVoucherStocksController } from './supplier_voucher_stocks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierVoucherStock } from './entities/supplier_voucher_stock.entity';
import { UtilityModule } from 'src/core/utility/utility.module';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierVoucherStock]), UtilityModule],
  controllers: [SupplierVoucherStocksController],
  providers: [SupplierVoucherStocksService],
  exports: [SupplierVoucherStocksService]
})
export class SupplierVoucherStocksModule { }
