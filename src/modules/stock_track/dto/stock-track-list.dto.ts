import { ApiProperty } from "@nestjs/swagger";
import { StockListDto } from "src/modules/stock/dto/stock-list.dto";

export class StockTrackInfoDto extends StockListDto {
    total_delivered?: number;
    total_stored?: number;
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
}