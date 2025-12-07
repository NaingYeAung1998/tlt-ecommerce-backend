import { SupplierVoucherPayment } from "src/modules/supplier_voucher_payments/entities/supplier_voucher_payment.entity";
import { SupplierVoucherStock } from "src/modules/supplier_voucher_stocks/entities/supplier_voucher_stock.entity";

export class CreateSupplierVoucherDto {
    voucher_code: string;
    total_amount?: number;
    total_paid?: number;
    supplier: CreateSupplierVoucherSupplierDto;
    stocks: SupplierVoucherStock[];
    payments: SupplierVoucherPayment[];
}

export class CreateSupplierVoucherSupplierDto {
    supplier_id: string
}
