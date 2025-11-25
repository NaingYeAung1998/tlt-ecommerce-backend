import { Test, TestingModule } from '@nestjs/testing';
import { SupplierVoucherController } from './supplier_voucher.controller';
import { SupplierVoucherService } from './supplier_voucher.service';

describe('SupplierVoucherController', () => {
  let controller: SupplierVoucherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplierVoucherController],
      providers: [SupplierVoucherService],
    }).compile();

    controller = module.get<SupplierVoucherController>(SupplierVoucherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
