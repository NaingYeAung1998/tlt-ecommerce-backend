import { ApiProperty } from "@nestjs/swagger";

export class CreateUnitDto {
    @ApiProperty()
    unit_name: string;
    @ApiProperty()
    unit_symbol: string;
}
