import { Test, TestingModule } from '@nestjs/testing';
import { SupplierVoucherStocksController } from './supplier_voucher_stocks.controller';
import { SupplierVoucherStocksService } from './supplier_voucher_stocks.service';

describe('SupplierVoucherStocksController', () => {
  let controller: SupplierVoucherStocksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplierVoucherStocksController],
      providers: [SupplierVoucherStocksService],
    }).compile();

    controller = module.get<SupplierVoucherStocksController>(SupplierVoucherStocksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
