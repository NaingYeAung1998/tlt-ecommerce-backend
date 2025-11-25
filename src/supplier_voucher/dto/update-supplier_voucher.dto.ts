import { PartialType } from '@nestjs/swagger';
import { CreateSupplierVoucherDto } from './create-supplier_voucher.dto';

export class UpdateSupplierVoucherDto extends PartialType(CreateSupplierVoucherDto) {}
