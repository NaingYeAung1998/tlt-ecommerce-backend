export class StockListDto {
    stock_id: string;
    stock_code: string;
    stock_product: string;
    stock_supplier: string;
    stock_unit: string;
    quantity: number;
    buying_price: string;
    selling_price: string;
    fix_price: string;
    note?: string;
    created_on: Date;
}