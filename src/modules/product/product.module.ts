import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { UtilityModule } from 'src/core/utility/utility.module';
import { UnitModule } from '../unit/unit.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), UtilityModule, UnitModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule { }
