import { Test, TestingModule } from '@nestjs/testing';
import { SupplierVoucherStocksService } from './supplier_voucher_stocks.service';

describe('SupplierVoucherStocksService', () => {
  let service: SupplierVoucherStocksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplierVoucherStocksService],
    }).compile();

    service = module.get<SupplierVoucherStocksService>(SupplierVoucherStocksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
