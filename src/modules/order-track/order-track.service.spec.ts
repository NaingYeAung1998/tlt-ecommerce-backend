import { Test, TestingModule } from '@nestjs/testing';
import { OrderTrackService } from './order-track.service';

describe('OrderTrackService', () => {
  let service: OrderTrackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderTrackService],
    }).compile();

    service = module.get<OrderTrackService>(OrderTrackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
