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
      return await this.unitRepository.find({ where: { is_delete: false }, order: { unit_symbol: 'ASC' } });
    } else {
      let [data, totalLength] = await this.unitRepository.createQueryBuilder("unit")
        .where("unit.is_delete = :is_delete AND ( unit.unit_name Like(:search) OR unit.unit_symbol Like(:search))", { is_delete: false, search: `%${search}%` })
        .leftJoinAndSelect('unit.parent_unit', 'parent')
        .orderBy("unit.created_on", "DESC")
        .skip(currentPage * perPage)
        .take(perPage)
        .getManyAndCount();

      return this.utilityService.createPaginationList(data, currentPage, perPage, totalLength);
    }
  }

  findOne(id: string) {
    return this.unitRepository.findOne({ where: { unit_id: id }, relations: ['parent_unit'] });
  }

  update(id: string, updateUnitDto: UpdateUnitDto) {
    return this.unitRepository.update({ unit_id: id }, updateUnitDto)
  }

  async roundupUnit(quantity_per_bag?: number, per_bag_unit_id?: string) {
    let units = await this.unitRepository.find();
    units.forEach((unit) => {

    })
  }

  async getUnitHierarchy(unit_id: string) {
    let units = await this.unitRepository.find({ relations: ['parent_unit'] });
    let unit = units.find(x => x.unit_id == unit_id)

    let parentUnits = this.getParentUnits(units, unit, []);

    let childUnits = this.getChildUnits(units, unit, []);

    let unitHierarchy = [...parentUnits, unit, ...childUnits];
    return unitHierarchy;
  }

  getParentUnits(units: Unit[], unit: Unit, result: Unit[]) {
    if (unit.parent_unit) {
      let parent_unit = units.find(x => x.unit_id == unit.parent_unit.unit_id);
      if (parent_unit) {
        result.unshift(parent_unit);
        return this.getParentUnits(units, parent_unit, result);
      }
      else {
        return result;
      }
    } else {
      return result;
    }
  }

  getChildUnits(units: Unit[], unit: Unit, result: Unit[]) {
    let child_unit = units.find(x => x.parent_unit?.unit_id == unit.unit_id)
    if (child_unit) {
      result.push(child_unit);
      return this.getChildUnits(units, child_unit, result);
    } else {
      return result;
    }
  }

  async remove(id: string) {
    let unit = await this.findOne(id);
    if (!unit) {
      throw new HttpException("Unit not found", HttpStatus.NOT_FOUND);
    }
    unit.is_delete = true;
    return this.unitRepository.update({ unit_id: id }, unit);
  }
}
