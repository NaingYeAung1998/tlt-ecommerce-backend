import { Injectable } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
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
      return await this.warehouseRepository.find({ order: { warehouse_name: 'ASC' } });
    } else {
      let [data, toatlLength] = await this.warehouseRepository.findAndCount({
        where: [
          { warehouse_name: ILike(`%${search}%`) },
          { warehouse_address: ILike(`%${search}%`) },
          { warehouse_phone: ILike(`%${search}%`) },
          { note: ILike(`%${search}%`) }
        ],
        order: { created_on: 'DESC' },
        skip: currentPage * perPage,
        take: perPage
      });
      return this.utilityService.createPaginationList(data, currentPage, perPage, toatlLength)
    }

  }

  findOne(id: string) {
    return this.warehouseRepository.findOne({ where: { warehouse_id: id } })
  }

  update(id: string, updateWarehouseDto: UpdateWarehouseDto) {
    return this.warehouseRepository.update({ warehouse_id: id }, updateWarehouseDto)
  }

  remove(id: number) {
    return `This action removes a #${id} warehouse`;
  }
}
