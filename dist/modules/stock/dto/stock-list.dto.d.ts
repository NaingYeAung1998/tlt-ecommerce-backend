export declare class StockListDto {
    stock_id: string;
    stock_code: string;
    stock_product: string;
    stock_product_id: string;
    stock_supplier: string;
    stock_supplier_id: string;
    stock_warehouse: string;
    stock_warehouse_id: string;
    stock_unit: string;
    stock_unit_id: string;
    quantity: number;
    buying_price: number;
    selling_price: number;
    fix_price: number;
    wholesale_selling_price: number;
    wholesale_fix_price: number;
    wholesale_starting_quantity: number;
    wholesale_starting_unit: string;
    wholesale_strating_unit_id: string;
    buying_price_formatted: string;
    selling_price_formatted: string;
    fix_price_formatted: string;
    note?: string;
    created_on: Date;
}
