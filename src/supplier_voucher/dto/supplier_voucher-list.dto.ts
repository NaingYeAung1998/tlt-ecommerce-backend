export class SupplierVoucherListDto {
    voucher_id: string;
    voucher_code: string;
    total_amount?: number;
    total_paid?: number;
    supplier: string;
    created_on: Date;
    count: number;
}