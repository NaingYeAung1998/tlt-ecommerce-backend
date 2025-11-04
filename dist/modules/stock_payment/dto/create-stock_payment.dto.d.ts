export declare class CreateStockPaymentStockDto {
    stock_id: string;
}
export declare class CreateStockPaymentDto {
    amount: number;
    payment_date: Date;
    payment_channel?: string;
    stock: CreateStockPaymentStockDto;
}
