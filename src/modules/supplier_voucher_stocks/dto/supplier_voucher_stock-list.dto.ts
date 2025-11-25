export class SupplierVoucherStockListDto {
    voucher_id: string;
    voucher_code: string;
    number_of_stocks: number;
    total_amount: string;
    amount_due: string;
    status: SupplierVoucherStatus;
}

export enum SupplierVoucherStatus {
    PAYABLE = 0,
    COMPLETE = 1
}