import { Injectable } from '@nestjs/common';
import { CreateSupplierVoucherStockDto } from './dto/create-supplier_voucher_stock.dto';
import { UpdateSupplierVoucherStockDto } from './dto/update-supplier_voucher_stock.dto';
import { Repository } from 'typeorm';
import { SupplierVoucherStock } from './entities/supplier_voucher_stock.entity';
import { UtilityService } from 'src/core/utility/utility.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SupplierVoucherStocksService {
  constructor(
    @InjectRepository(SupplierVoucherStock)
    private supplierVoucherStockRepository: Repository<SupplierVoucherStock>,
    private utilityService: UtilityService
  ) { }
  create(createSupplierVoucherStockDto: CreateSupplierVoucherStockDto) {
    return 'This action adds a new supplierVoucherStock';
  }

  findAll() {
    return `This action returns all supplierVoucherStocks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} supplierVoucherStock`;
  }

  update(id: number, updateSupplierVoucherStockDto: UpdateSupplierVoucherStockDto) {
    return `This action updates a #${id} supplierVoucherStock`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplierVoucherStock`;
  }
}
