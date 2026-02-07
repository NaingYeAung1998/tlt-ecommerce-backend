import { Test, TestingModule } from '@nestjs/testing';
import { OrderPaymentsController } from './order_payments.controller';
import { OrderPaymentsService } from './order_payments.service';

describe('OrderPaymentsController', () => {
  let controller: OrderPaymentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderPaymentsController],
      providers: [OrderPaymentsService],
    }).compile();

    controller = module.get<OrderPaymentsController>(OrderPaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
