import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupplierVoucherPaymentsService } from './supplier_voucher_payments.service';
import { CreateSupplierVoucherPaymentDto } from './dto/create-supplier_voucher_payment.dto';
import { UpdateSupplierVoucherPaymentDto } from './dto/update-supplier_voucher_payment.dto';

@Controller('supplier-voucher-payments')
export class SupplierVoucherPaymentsController {
  constructor(private readonly supplierVoucherPaymentsService: SupplierVoucherPaymentsService) {}

  @Post()
  create(@Body() createSupplierVoucherPaymentDto: CreateSupplierVoucherPaymentDto) {
    return this.supplierVoucherPaymentsService.create(createSupplierVoucherPaymentDto);
  }

  @Get()
  findAll() {
    return this.supplierVoucherPaymentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplierVoucherPaymentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupplierVoucherPaymentDto: UpdateSupplierVoucherPaymentDto) {
    return this.supplierVoucherPaymentsService.update(+id, updateSupplierVoucherPaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplierVoucherPaymentsService.remove(+id);
  }
}
