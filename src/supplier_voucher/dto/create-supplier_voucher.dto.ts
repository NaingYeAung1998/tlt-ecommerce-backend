import { CreateStockSupplierVoucherStockDto } from "src/modules/supplier_voucher_stocks/dto/create-supplier_voucher_stock.dto";
import { SupplierVoucherStock } from "src/modules/supplier_voucher_stocks/entities/supplier_voucher_stock.entity";

export class CreateSupplierVoucherDto {
    voucher_code: string;
    total_amount?: number;
    stocks: SupplierVoucherStock[]
}
