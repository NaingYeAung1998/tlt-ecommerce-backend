import { ApiProperty } from "@nestjs/swagger";

export class CreateCustomerDto {
    @ApiProperty()
    customer_name: string;
    @ApiProperty()
    customer_address?: string;
    @ApiProperty()
    customer_phone?: string;
    @ApiProperty()
    note?: string;
}
