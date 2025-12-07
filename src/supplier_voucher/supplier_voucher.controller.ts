import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SupplierVoucherService } from './supplier_voucher.service';
import { CreateSupplierVoucherDto } from './dto/create-supplier_voucher.dto';
import { UpdateSupplierVoucherDto } from './dto/update-supplier_voucher.dto';

@Controller('supplier_voucher')
export class SupplierVoucherController {
  constructor(private readonly supplierVoucherService: SupplierVoucherService) { }

  @Post()
  create(@Body() createSupplierVoucherDto: CreateSupplierVoucherDto) {
    return this.supplierVoucherService.create(createSupplierVoucherDto);
  }

  @Get()
  findAll(@Query() query: { search: string, currentPage: number, perPage: number }) {
    return this.supplierVoucherService.findAll(query.search, query.currentPage, query.perPage);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplierVoucherService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupplierVoucherDto: UpdateSupplierVoucherDto) {
    return this.supplierVoucherService.update(id, updateSupplierVoucherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplierVoucherService.remove(+id);
  }
}
