import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSupplierVoucherDto } from './dto/create-supplier_voucher.dto';
import { UpdateSupplierVoucherDto } from './dto/update-supplier_voucher.dto';
import { Repository } from 'typeorm';
import { SupplierVoucher } from './entities/supplier_voucher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UtilityService } from 'src/core/utility/utility.service';
import { SupplierVoucherListDto } from './dto/supplier_voucher-list.dto';
import { SUPPLIER_VOUCHER_INITIALS } from 'src/core/constants';
import { query } from 'express';
import { SupplierVoucherPaymentsService } from 'src/modules/supplier_voucher_payments/supplier_voucher_payments.service';
import { SupplierVoucherStocksService } from 'src/modules/supplier_voucher_stocks/supplier_voucher_stocks.service';

@Injectable()
export class SupplierVoucherService {
  constructor(
    @InjectRepository(SupplierVoucher)
    private supplierVoucherRepository: Repository<SupplierVoucher>,
    private utilityService: UtilityService,
    private supplierVoucherPaymentsService: SupplierVoucherPaymentsService,
    private supplierVoucherStocksService: SupplierVoucherStocksService
  ) { }
  async create(createSupplierVoucherDto: CreateSupplierVoucherDto) {
    let voucherCount = await this.supplierVoucherRepository.count();
    createSupplierVoucherDto.voucher_code = this.utilityService.formatAutoIncrementCode(SUPPLIER_VOUCHER_INITIALS, voucherCount)
    return this.supplierVoucherRepository.save(createSupplierVoucherDto)
  }

  async findAll(search: string, currentPage: number, perPage: number) {
    let data: SupplierVoucherListDto[] = await this.supplierVoucherRepository.createQueryBuilder("supplier_voucher")
      .select("supplier_voucher.*")
      .addSelect("SUM(voucher_payment.amount)", "total_paid")
      .addSelect("voucher_stock.buying_amount", "total_amount")
      .addSelect("COUNT(DISTINCT supplier_voucher.voucher_id)", "count")
      .addSelect("supplier.supplier_name", "supplier")
      .leftJoin("supplier_voucher.supplier", "supplier")
      .leftJoin("supplier_voucher.payments", "voucher_payment")
      .leftJoin(subQuery => {
        return subQuery
          .select('voucher_stock.voucher_id')
          .addSelect('SUM(stock.buying_price)', 'buying_amount')
          .from('supplier_voucher_stock', 'voucher_stock')
          .leftJoin('stock', 'stock', 'voucher_stock.stock_id = stock.stock_id')
          .groupBy('voucher_stock.voucher_id, voucher_stock.deleted_on');
      }, "voucher_stock", 'voucher_stock.voucher_id = supplier_voucher.voucher_id')
      .groupBy("supplier_voucher.voucher_id, total_amount")
      .skip(currentPage * perPage)
      .take(perPage)
      .getRawMany()
    let totalLength = data[0] ? data[0].count : 0
    return this.utilityService.createPaginationList(data, currentPage, perPage, totalLength)
  }

  findOne(id: string) {
    return this.supplierVoucherRepository.createQueryBuilder("supplier_voucher")
      .leftJoinAndSelect("supplier_voucher.supplier", "supplier")
      .leftJoinAndSelect("supplier_voucher.stocks", "stocks")
      .leftJoinAndSelect("supplier_voucher.payments", "payments")
      .leftJoinAndSelect("stocks.stock", "stock")
      .leftJoinAndSelect("stock.unit", "unit")
      .leftJoinAndSelect("stock.product", "product")
      .where("supplier_voucher.voucher_id = :voucher_id", { voucher_id: id })
      .getOne();
  }

  async update(id: string, updateSupplierVoucherDto: UpdateSupplierVoucherDto) {
    let voucher = await this.findOne(id);
    if (!voucher) {
      throw new HttpException('Cannot find voucher', HttpStatus.BAD_REQUEST)
    }
    await this.supplierVoucherPaymentsService.removeBatch(voucher.payments);
    await this.supplierVoucherStocksService.removeBatch(voucher.stocks);
    voucher.payments = updateSupplierVoucherDto.payments;
    voucher.stocks = updateSupplierVoucherDto.stocks
    return this.supplierVoucherRepository.save(voucher);
  }

  remove(id: number) {
    return `This action removes a #${id} supplierVoucher`;
  }
}
