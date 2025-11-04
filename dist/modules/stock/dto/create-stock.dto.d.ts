export declare class CreateStockProductDto {
    product_id: string;
}
export declare class CreateStockSupplierDto {
    supplier_id: string;
}
export declare class CreateStockUnitDto {
    unit_id: string;
}
export declare class CreateStockDto {
    stock_code: string;
    product: CreateStockProductDto;
    supplier: CreateStockSupplierDto;
    unit: CreateStockUnitDto;
    quantity: number;
    buying_price: number;
    selling_price: number;
    fix_price: number;
    note?: string;
}
