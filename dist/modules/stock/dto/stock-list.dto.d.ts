export declare class StockListDto {
    stock_id: string;
    stock_code: string;
    stock_product: string;
    stock_supplier: string;
    stock_unit: string;
    quantity: number;
    buying_price: number;
    selling_price: number;
    fix_price: number;
    buying_price_formatted: string;
    selling_price_formatted: string;
    fix_price_formatted: string;
    note?: string;
    created_on: Date;
}
