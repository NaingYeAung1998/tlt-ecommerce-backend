import { ApiProperty } from "@nestjs/swagger";

export class CreateWarehouseDto {
    @ApiProperty()
    warehouse_name: string;
    @ApiProperty()
    warehouse_phone?: string;
    @ApiProperty()
    warehouse_address?: string;
    @ApiProperty()
    note?: string;
}
