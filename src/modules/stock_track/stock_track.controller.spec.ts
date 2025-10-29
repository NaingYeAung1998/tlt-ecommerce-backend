import { Test, TestingModule } from '@nestjs/testing';
import { StockTrackController } from './stock_track.controller';
import { StockTrackService } from './stock_track.service';

describe('StockTrackController', () => {
  let controller: StockTrackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockTrackController],
      providers: [StockTrackService],
    }).compile();

    controller = module.get<StockTrackController>(StockTrackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
