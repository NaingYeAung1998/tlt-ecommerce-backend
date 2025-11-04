import { StockTrackStatus } from "../entities/stock_track.entity";
export declare class CreateStockTrackStockDto {
    stock_id: string;
}
export declare class CreateStockTrackWarehouseDto {
    warehouse_id: string;
}
export declare class CreateStockTrackDto {
    quantity: number;
    checked_date: Date;
    status: StockTrackStatus;
    note?: string;
    stock: CreateStockTrackStockDto;
    warehouse: CreateStockTrackWarehouseDto;
}
