import { Test, TestingModule } from '@nestjs/testing';
import { StockTrackService } from './stock_track.service';

describe('StockTrackService', () => {
  let service: StockTrackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockTrackService],
    }).compile();

    service = module.get<StockTrackService>(StockTrackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
