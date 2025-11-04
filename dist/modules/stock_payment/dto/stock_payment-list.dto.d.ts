import { StockListDto } from "src/modules/stock/dto/stock-list.dto";
export declare class StockPaymentInfoDto extends StockListDto {
    total_paid?: number;
    total_paid_formatted?: string;
}
export declare class StockPaymentListDto {
    payment_id: string;
    amount: number;
    payment_channel: string;
    payment_date: Date;
    created_on: Date;
    note?: string;
    amount_formatted: string;
}
