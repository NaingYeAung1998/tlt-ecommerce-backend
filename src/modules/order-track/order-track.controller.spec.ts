import { Test, TestingModule } from '@nestjs/testing';
import { OrderTrackController } from './order-track.controller';
import { OrderTrackService } from './order-track.service';

describe('OrderTrackController', () => {
  let controller: OrderTrackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderTrackController],
      providers: [OrderTrackService],
    }).compile();

    controller = module.get<OrderTrackController>(OrderTrackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
