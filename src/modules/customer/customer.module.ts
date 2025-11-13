import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { UtilityModule } from 'src/core/utility/utility.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer]), UtilityModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule { }
