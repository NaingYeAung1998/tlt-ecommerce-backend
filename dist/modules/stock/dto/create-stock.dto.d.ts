import { CreateWarehouseDto } from "src/modules/warehouse/dto/create-warehouse.dto";
export declare class CreateStockProductDto {
    product_id: string;
}
export declare class CreateStockSupplierDto {
    supplier_id: string;
}
export declare class CreateStockUnitDto {
    unit_id: string;
}
export declare class CreateStockWarehouseDto {
    warehouse_id: string;
}
export declare class CreateStockDto {
    stock_code: string;
    product: CreateStockProductDto;
    supplier: CreateStockSupplierDto;
    warehouse: CreateWarehouseDto;
    unit: CreateStockUnitDto;
    quantity: number;
    buying_price: number;
    selling_price: number;
    fix_price: number;
    note?: string;
}
