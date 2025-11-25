import { Injectable } from '@nestjs/common';
import { CreateSupplierVoucherDto } from './dto/create-supplier_voucher.dto';
import { UpdateSupplierVoucherDto } from './dto/update-supplier_voucher.dto';
import { Repository } from 'typeorm';
import { SupplierVoucher } from './entities/supplier_voucher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UtilityService } from 'src/core/utility/utility.service';

@Injectable()
export class SupplierVoucherService {
  constructor(
    @InjectRepository(SupplierVoucher)
    private supplierVoucherRepository: Repository<SupplierVoucher>,
    private utilityService: UtilityService
  ) { }
  create(createSupplierVoucherDto: CreateSupplierVoucherDto) {
    return this.supplierVoucherRepository.save(createSupplierVoucherDto)
  }

  findAll() {
    // this.supplierVoucherRepository.createQueryBuilder("supplier_voucher")
    // .leftJoin("supplier_voucher.")
  }

  findOne(id: number) {
    return `This action returns a #${id} supplierVoucher`;
  }

  update(id: number, updateSupplierVoucherDto: UpdateSupplierVoucherDto) {
    return `This action updates a #${id} supplierVoucher`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplierVoucher`;
  }
}
