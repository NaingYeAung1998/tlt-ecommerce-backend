import { ApiProperty } from "@nestjs/swagger";

export class CreateSupplierDto {
    @ApiProperty()
    supplier_name: string;
    @ApiProperty()
    supplier_address?: string;
    @ApiProperty()
    supplier_phone?: string;
    @ApiProperty()
    note?: string;
}
