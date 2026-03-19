import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { UtilityModule } from 'src/core/utility/utility.module';
import { StockTrackModule } from '../stock_track/stock_track.module';

@Module({
  imports: [TypeOrmModule.forFeature([Stock]), UtilityModule, StockTrackModule],
  controllers: [StockController],
  providers: [StockService],
  exports: [StockService]
})
export class StockModule { }
