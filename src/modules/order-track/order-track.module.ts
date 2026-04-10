import { Module } from '@nestjs/common';
import { OrderTrackService } from './order-track.service';
import { OrderTrackController } from './order-track.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderTrack } from './entities/order-track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderTrack])],
  controllers: [OrderTrackController],
  providers: [OrderTrackService],
  exports: [OrderTrackService]
})
export class OrderTrackModule { }
