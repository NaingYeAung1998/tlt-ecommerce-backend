import { PartialType } from '@nestjs/swagger';
import { CreateSupplierVoucherPaymentDto } from './create-supplier_voucher_payment.dto';

export class UpdateSupplierVoucherPaymentDto extends PartialType(CreateSupplierVoucherPaymentDto) {}
