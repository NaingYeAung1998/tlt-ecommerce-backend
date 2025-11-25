import { PartialType } from '@nestjs/swagger';
import { CreateSupplierVoucherStockDto } from './create-supplier_voucher_stock.dto';

export class UpdateSupplierVoucherStockDto extends PartialType(CreateSupplierVoucherStockDto) {}
