import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
      return await this.gradeRepository.find({ where: { isDelete: false }, order: { grade_name: 'ASC' } });
    } else {
      let [data, toatlLength] = await this.gradeRepository.createQueryBuilder("grade")
        .where("grade.isDelete = :isDelete AND ( grade.grade_name Like(:search) OR grade.grade_description Like(:search))", { isDelete: false, search: `%${search}%` })
        .orderBy("grade.created_on", "DESC")
        .skip(currentPage * perPage)
        .take(perPage)
        .getManyAndCount();
      return this.utilityService.createPaginationList(data, currentPage, perPage, toatlLength);
    }

  }

  findOne(id: string) {
    return this.gradeRepository.findOne({ where: { grade_id: id } })
  }

  update(id: string, updateGradeDto: UpdateGradeDto) {
    return this.gradeRepository.update({ grade_id: id }, updateGradeDto)
  }

  async remove(id: string) {
    let grade = await this.findOne(id);
    if (!grade) {
      throw new HttpException("Grade not found", HttpStatus.NOT_FOUND);
    }
    grade.isDelete = true;
    return this.gradeRepository.update({ grade_id: id }, grade);
  }
}
