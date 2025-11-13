import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { ILike, Repository } from 'typeorm';
import { Unit } from './entities/unit.entity';
import { UtilityService } from 'src/core/utility/utility.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(Unit)
    private unitRepository: Repository<Unit>,
    private utilityService: UtilityService
  ) { }
  create(createUnitDto: CreateUnitDto) {
    return this.unitRepository.save(createUnitDto);
  }

  async findAll(search: string, currentPage: number, perPage: number) {
    if (perPage < 0) {
      return await this.unitRepository.find({ where: { isDelete: false }, order: { unit_symbol: 'ASC' } });
    } else {
      let [data, toatlLength] = await this.unitRepository.createQueryBuilder("unit")
        .where("unit.isDelete = :isDelete AND ( unit.unit_name Like(:search) OR unit.unit_symbol Like(:search))", { isDelete: false, search: `%${search}%` })
        .orderBy("unit.created_on", "DESC")
        .skip(currentPage * perPage)
        .take(perPage)
        .getManyAndCount();

      return this.utilityService.createPaginationList(data, currentPage, perPage, toatlLength);
    }

  }

  findOne(id: string) {
    return this.unitRepository.findOne({ where: { unit_id: id } });
  }

  update(id: string, updateUnitDto: UpdateUnitDto) {
    return this.unitRepository.update({ unit_id: id }, updateUnitDto)
  }

  async remove(id: string) {
    let unit = await this.findOne(id);
    if (!unit) {
      throw new HttpException("Unit not found", HttpStatus.NOT_FOUND);
    }
    unit.isDelete = true;
    return this.unitRepository.update({ unit_id: id }, unit);
  }
}
