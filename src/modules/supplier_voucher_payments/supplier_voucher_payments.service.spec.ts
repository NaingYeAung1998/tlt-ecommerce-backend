import { Test, TestingModule } from '@nestjs/testing';
import { SupplierVoucherPaymentsService } from './supplier_voucher_payments.service';

describe('SupplierVoucherPaymentsService', () => {
  let service: SupplierVoucherPaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplierVoucherPaymentsService],
    }).compile();

    service = module.get<SupplierVoucherPaymentsService>(SupplierVoucherPaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
