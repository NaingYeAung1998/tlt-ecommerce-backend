import { Injectable } from '@nestjs/common';
import { CreateSupplierVoucherPaymentDto } from './dto/create-supplier_voucher_payment.dto';
import { UpdateSupplierVoucherPaymentDto } from './dto/update-supplier_voucher_payment.dto';
import { Repository } from 'typeorm';
import { SupplierVoucherPayment } from './entities/supplier_voucher_payment.entity';
import { UtilityService } from 'src/core/utility/utility.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SupplierVoucherPaymentsService {
  constructor(
    @InjectRepository(SupplierVoucherPayment)
    private supplierVoucherPaymentRepository: Repository<SupplierVoucherPayment>,
    private utilityService: UtilityService
  ) { }
  create(createSupplierVoucherPaymentDto: CreateSupplierVoucherPaymentDto) {
    return 'This action adds a new supplierVoucherPayment';
  }

  findAll() {
    return `This action returns all supplierVoucherPayments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} supplierVoucherPayment`;
  }

  update(id: number, updateSupplierVoucherPaymentDto: UpdateSupplierVoucherPaymentDto) {
    return `This action updates a #${id} supplierVoucherPayment`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplierVoucherPayment`;
  }
}
