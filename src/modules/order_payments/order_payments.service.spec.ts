import { Test, TestingModule } from '@nestjs/testing';
import { OrderPaymentsService } from './order_payments.service';

describe('OrderPaymentsService', () => {
  let service: OrderPaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderPaymentsService],
    }).compile();

    service = module.get<OrderPaymentsService>(OrderPaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
