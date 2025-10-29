import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { UtilityModule } from 'src/core/utility/utility.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), UtilityModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule { }
