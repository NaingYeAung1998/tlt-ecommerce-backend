import { ApiProperty } from "@nestjs/swagger";

export class CreateStockPaymentStockDto {
    @ApiProperty()
    stock_id: string
}

export class CreateStockPaymentDto {
    @ApiProperty()
    amount: number;
    @ApiProperty()
    payment_date: Date;
    @ApiProperty()
    payment_channel?: string;
    @ApiProperty()
    stock: CreateStockPaymentStockDto
}

