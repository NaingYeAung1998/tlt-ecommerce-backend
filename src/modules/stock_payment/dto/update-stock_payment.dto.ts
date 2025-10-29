import { PartialType } from '@nestjs/swagger';
import { CreateStockPaymentDto } from './create-stock_payment.dto';

export class UpdateStockPaymentDto extends PartialType(CreateStockPaymentDto) {}
