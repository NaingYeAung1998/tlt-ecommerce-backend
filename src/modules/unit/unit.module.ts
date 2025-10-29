import { Module } from '@nestjs/common';
import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from './entities/unit.entity';
import { UtilityModule } from 'src/core/utility/utility.module';

@Module({
  imports: [TypeOrmModule.forFeature([Unit]), UtilityModule],
  controllers: [UnitController],
  providers: [UnitService],
})
export class UnitModule { }
