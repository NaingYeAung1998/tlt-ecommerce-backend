import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupplierVoucherStocksService } from './supplier_voucher_stocks.service';
import { CreateSupplierVoucherStockDto } from './dto/create-supplier_voucher_stock.dto';
import { UpdateSupplierVoucherStockDto } from './dto/update-supplier_voucher_stock.dto';

@Controller('supplier-voucher-stocks')
export class SupplierVoucherStocksController {
  constructor(private readonly supplierVoucherStocksService: SupplierVoucherStocksService) {}

  @Post()
  create(@Body() createSupplierVoucherStockDto: CreateSupplierVoucherStockDto) {
    return this.supplierVoucherStocksService.create(createSupplierVoucherStockDto);
  }

  @Get()
  findAll() {
    return this.supplierVoucherStocksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplierVoucherStocksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupplierVoucherStockDto: UpdateSupplierVoucherStockDto) {
    return this.supplierVoucherStocksService.update(+id, updateSupplierVoucherStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplierVoucherStocksService.remove(+id);
  }
}
