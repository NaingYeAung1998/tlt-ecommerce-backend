import { ApiProperty } from "@nestjs/swagger";
import { StockTrackStatus } from "../entities/stock_track.entity";

export class CreateStockTrackStockDto {
    @ApiProperty()
    stock_id: string;
}

export class CreateStockTrackDto {
    @ApiProperty()
    quantity: number;
    @ApiProperty()
    checked_date: Date;
    @ApiProperty()
    status: StockTrackStatus
}
