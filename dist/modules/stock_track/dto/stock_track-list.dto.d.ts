import { StockListDto } from "src/modules/stock/dto/stock-list.dto";
export declare class StockTrackInfoDto extends StockListDto {
    total_delivered?: number;
    total_stored?: number;
}
export declare class StockTrackListDto {
    track_id: string;
    quantity: number;
    checked_date: Date;
    status: number;
    created_on: Date;
    note?: string;
    warehouse_name: string;
}
