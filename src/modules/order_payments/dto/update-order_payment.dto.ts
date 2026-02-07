import { PartialType } from '@nestjs/swagger';
import { CreateOrderPaymentDto } from './create-order_payment.dto';

export class UpdateOrderPaymentDto extends PartialType(CreateOrderPaymentDto) {}
