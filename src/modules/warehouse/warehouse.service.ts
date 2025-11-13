import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { And, ILike, Repository } from 'typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { UtilityService } from 'src/core/utility/utility.service';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse)
    private warehouseRepository: Repository<Warehouse>,
    private utilityService: UtilityService
  ) { }
  create(createWarehouseDto: CreateWarehouseDto) {
    return this.warehouseRepository.save(createWarehouseDto);
  }

  async findAll(search: string, currentPage: number, perPage: number) {
    if (perPage < 0) {
      return await this.warehouseRepository.find({ where: { isDelete: false }, order: { warehouse_name: 'ASC' } });
    } else {
      let [data, toatlLength] = await this.warehouseRepository.createQueryBuilder("warehouse")
        .where("warehouse.isDelete = :isDelete AND ( warehouse.warehouse_name Like(:search) OR warehouse.warehouse_address Like(:search) OR warehouse.warehouse_phone Like(:search) OR warehouse.note Like(:search))", { isDelete: false, search: `%${search}%` })
        .orderBy("warehouse.created_on", "DESC")
        .skip(currentPage * perPage)
        .take(perPage)
        .getManyAndCount();
      return this.utilityService.createPaginationList(data, currentPage, perPage, toatlLength)
    }

  }

  findOne(id: string) {
    return this.warehouseRepository.findOne({ where: { warehouse_id: id } })
  }

  update(id: string, updateWarehouseDto: UpdateWarehouseDto) {
    return this.warehouseRepository.update({ warehouse_id: id }, updateWarehouseDto)
  }

  async remove(id: string) {
    let warehouse = await this.findOne(id);
    if (!warehouse) {
      throw new HttpException("Warehouse Not Found", HttpStatus.NOT_FOUND);
    }
    warehouse.isDelete = true;
    return this.warehouseRepository.update({ warehouse_id: id }, warehouse)
  }
}
