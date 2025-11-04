import { Stock } from "src/modules/stock/entities/stock.entity";
import { Warehouse } from "src/modules/warehouse/entities/warehouse.entity";
export declare class StockTrack {
    track_id: string;
    quantity: number;
    checked_date: Date;
    status: StockTrackStatus;
    note?: string;
    created_on: Date;
    updated_on: Date;
    deleted_on: Date;
    stock: Stock;
    warehouse: Warehouse;
}
export declare enum StockTrackStatus {
    DELIVERD = 0,
    STORED = 1
}
