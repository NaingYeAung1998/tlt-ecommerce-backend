import { ApiProperty } from "@nestjs/swagger";
import { StockListDto } from "src/modules/stock/dto/stock-list.dto";

export class StockPaymentInfoDto extends StockListDto {
    total_paid?: number
    total_paid_formatted?: string
}

export class StockPaymentListDto {
    @ApiProperty()
    payment_id: string;
    @ApiProperty()
    amount: number;
    @ApiProperty()
    payment_channel: string;
    @ApiProperty()
    payment_date: Date;
    @ApiProperty()
    created_on: Date;
    @ApiProperty()
    note?: string
    @ApiProperty()
    amount_formatted: string;
}