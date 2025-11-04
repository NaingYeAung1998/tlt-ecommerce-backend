import { Stock } from "src/modules/stock/entities/stock.entity";
export declare class StockPayment {
    payment_id: string;
    amount: number;
    payment_date: Date;
    payment_channel?: string;
    note?: string;
    created_on: Date;
    updated_on: Date;
    deleted_on: Date;
    stock: Stock;
}
