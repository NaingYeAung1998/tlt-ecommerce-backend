import { Injectable } from '@nestjs/common';
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
      return await this.unitRepository.find({ order: { unit_symbol: 'ASC' } });
    } else {
      let [data, toatlLength] = await this.unitRepository.findAndCount({
        where: [
          { unit_name: ILike(`%${search}%`) },
          { unit_symbol: ILike(`%${search}%`) },
        ],
        order: { created_on: 'DESC' },
        skip: currentPage * perPage,
        take: perPage
      });
      return this.utilityService.createPaginationList(data, currentPage, perPage, toatlLength);
    }

  }

  findOne(id: string) {
    return this.unitRepository.findOne({ where: { unit_id: id } });
  }

  update(id: string, updateUnitDto: UpdateUnitDto) {
    return this.unitRepository.update({ unit_id: id }, updateUnitDto)
  }

  remove(id: number) {
    return `This action removes a #${id} unit`;
  }
}
