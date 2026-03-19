import { ApiProperty } from "@nestjs/swagger";
import { StockListDto } from "src/modules/stock/dto/stock-list.dto";

export class StockTrackInfoDto extends StockListDto {
    total_delivered?: number;
    total_stored?: number;
    total_transferred?: number;
    total_received?: number;
    total_sold?: number;
    total_available?: number;
}

export class StockTrackListDto {
    @ApiProperty()
    track_id: string;
    @ApiProperty()
    quantity: number;
    @ApiProperty()
    checked_date: Date;
    @ApiProperty()
    status: number;
    @ApiProperty()
    created_on: Date;
    @ApiProperty()
    note?: string
    @ApiProperty()
    warehouse_name: string;
    unit_id?: string;
    unit_name?: string;
}