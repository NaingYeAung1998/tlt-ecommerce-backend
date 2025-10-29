import { PartialType } from '@nestjs/swagger';
import { CreateStockTrackDto } from './create-stock_track.dto';

export class UpdateStockTrackDto extends PartialType(CreateStockTrackDto) {}
