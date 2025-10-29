import { Module } from '@nestjs/common';
import { GradeService } from './grade.service';
import { GradeController } from './grade.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grade } from './entities/grade.entity';
import { UtilityModule } from 'src/core/utility/utility.module';

@Module({
  imports: [TypeOrmModule.forFeature([Grade]), UtilityModule],
  controllers: [GradeController],
  providers: [GradeService],
})
export class GradeModule { }
