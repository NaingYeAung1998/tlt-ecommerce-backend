import { PartialType } from '@nestjs/swagger';
import { CreateOrderTrackDto } from './create-order-track.dto';

export class UpdateOrderTrackDto extends PartialType(CreateOrderTrackDto) {}
