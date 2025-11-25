import { Test, TestingModule } from '@nestjs/testing';
import { SupplierVoucherPaymentsController } from './supplier_voucher_payments.controller';
import { SupplierVoucherPaymentsService } from './supplier_voucher_payments.service';

describe('SupplierVoucherPaymentsController', () => {
  let controller: SupplierVoucherPaymentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplierVoucherPaymentsController],
      providers: [SupplierVoucherPaymentsService],
    }).compile();

    controller = module.get<SupplierVoucherPaymentsController>(SupplierVoucherPaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
