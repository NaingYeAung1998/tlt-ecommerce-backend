import { Module } from '@nestjs/common';
import { StockTrackService } from './stock_track.service';
import { StockTrackController } from './stock_track.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockTrack } from './entities/stock_track.entity';
import { UtilityModule } from 'src/core/utility/utility.module';
import { StockModule } from '../stock/stock.module';

@Module({
  imports: [TypeOrmModule.forFeature([StockTrack]), UtilityModule, StockModule],
  controllers: [StockTrackController],
  providers: [StockTrackService],
})
export class StockTrackModule { }
