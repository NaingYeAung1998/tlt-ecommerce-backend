import { Product } from "src/modules/product/entities/product.entity";
import { StockTrack } from "src/modules/stock_track/entities/stock_track.entity";
import { Supplier } from "src/modules/supplier/entities/supplier.entity";
import { Unit } from "src/modules/unit/entities/unit.entity";
export declare class Stock {
    stock_id: string;
    stock_code: string;
    quantity: number;
    buying_price: number;
    selling_price: number;
    fix_price: number;
    note?: string;
    created_on: Date;
    updated_on: Date;
    deleted_on: Date;
    product: Product;
    unit: Unit;
    supplier: Supplier;
    stock_tracks: StockTrack[];
}
