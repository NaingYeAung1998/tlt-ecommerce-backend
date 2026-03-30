import { ApiProperty } from "@nestjs/swagger";
import { StockTrack } from "src/modules/stock_track/entities/stock_track.entity";
import { CreateWarehouseDto } from "src/modules/warehouse/dto/create-warehouse.dto";

export class CreateStockProductDto {
    @ApiProperty()
    product_id: string;
}

export class CreateStockSupplierDto {
    @ApiProperty()
    supplier_id: string;
}

export class CreateStockUnitDto {
    @ApiProperty()
    unit_id: string;
}

export class CreateStockWarehouseDto {
    @ApiProperty()
    warehouse_id: string;
}

export class CreateStockDto {
    @ApiProperty()
    stock_code: string;
    @ApiProperty()
    product: CreateStockProductDto;
    @ApiProperty()
    supplier: CreateStockSupplierDto;
    @ApiProperty()
    warehouse: CreateWarehouseDto;
    @ApiProperty()
    unit: CreateStockUnitDto;
    @ApiProperty()
    quantity: number;
    @ApiProperty()
    buying_price: number;
    @ApiProperty()
    buying_price_lowest_unit: number;
    @ApiProperty()
    selling_price: number;
    @ApiProperty()
    fix_price: number;
    @ApiProperty()
    note?: string;
    @ApiProperty()
    stock_tracks?: StockTrack[]
}


