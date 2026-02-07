import { ApiProperty } from "@nestjs/swagger";
import { StockTrackStatus } from "../entities/stock_track.entity";
import { CreateStockUnitDto } from "src/modules/stock/dto/create-stock.dto";

export class CreateStockTrackStockDto {
    @ApiProperty()
    stock_id: string;
}

export class CreateStockTrackWarehouseDto {
    @ApiProperty()
    warehouse_id: string;
}

export class CreateStockTrackUnitDto {
    @ApiProperty()
    unit_id: string;
}

export class CreateStockTrackDto {
    @ApiProperty()
    quantity: number;
    @ApiProperty()
    checked_date: Date;
    @ApiProperty()
    status: StockTrackStatus
    @ApiProperty()
    note?: string
    @ApiProperty()
    stock: CreateStockTrackStockDto;
    @ApiProperty()
    unit: CreateStockUnitDto
    @ApiProperty()
    warehouse: CreateStockTrackWarehouseDto;
}
