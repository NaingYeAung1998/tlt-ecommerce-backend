import { Test, TestingModule } from '@nestjs/testing';
import { SupplierVoucherService } from './supplier_voucher.service';

describe('SupplierVoucherService', () => {
  let service: SupplierVoucherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplierVoucherService],
    }).compile();

    service = module.get<SupplierVoucherService>(SupplierVoucherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
