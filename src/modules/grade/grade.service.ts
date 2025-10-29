import { Injectable } from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { ILike, Repository } from 'typeorm';
import { Grade } from './entities/grade.entity';
import { UtilityService } from 'src/core/utility/utility.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(Grade)
    private gradeRepository: Repository<Grade>,
    private utilityService: UtilityService
  ) { }
  create(createGradeDto: CreateGradeDto) {
    this.gradeRepository.save(createGradeDto);
  }

  async findAll(search: string, currentPage: number, perPage: number) {
    if (perPage < 0) {
      return await this.gradeRepository.find({ order: { grade_name: 'ASC' } });
    } else {
      let [data, toatlLength] = await this.gradeRepository.findAndCount({
        where: [
          { grade_name: ILike(`%${search}%`) },
          { grade_description: ILike(`%${search}%`) },
        ],
        order: { created_on: 'DESC' },
        skip: currentPage * perPage,
        take: perPage
      });
      return this.utilityService.createPaginationList(data, currentPage, perPage, toatlLength);
    }

  }

  findOne(id: string) {
    return this.gradeRepository.findOne({ where: { grade_id: id } })
  }

  update(id: string, updateGradeDto: UpdateGradeDto) {
    return this.gradeRepository.update({ grade_id: id }, updateGradeDto)
  }

  remove(id: number) {
    return `This action removes a #${id} grade`;
  }
}
