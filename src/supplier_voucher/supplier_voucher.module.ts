import { Module } from '@nestjs/common';
import { SupplierVoucherService } from './supplier_voucher.service';
import { SupplierVoucherController } from './supplier_voucher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierVoucher } from './entities/supplier_voucher.entity';
import { UtilityModule } from 'src/core/utility/utility.module';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierVoucher]), UtilityModule],
  controllers: [SupplierVoucherController],
  providers: [SupplierVoucherService],
})
export class SupplierVoucherModule { }
