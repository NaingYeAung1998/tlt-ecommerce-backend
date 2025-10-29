import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { UtilityModule } from 'src/core/utility/utility.module';

@Module({
  imports: [TypeOrmModule.forFeature([Supplier]), UtilityModule],
  controllers: [SupplierController],
  providers: [SupplierService],
})
export class SupplierModule { }
