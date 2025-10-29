import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { ILike, Repository } from 'typeorm';
import { UtilityService } from 'src/core/utility/utility.service';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
    private utilityService: UtilityService
  ) { }
  create(createSupplierDto: CreateSupplierDto) {
    return this.supplierRepository.save(createSupplierDto);
  }

  async findAll(search: string, currentPage: number, perPage: number) {
    if (perPage < 0) {
      return await this.supplierRepository.find({ order: { supplier_name: 'ASC' } });
    } else {
      let [data, toatlLength] = await this.supplierRepository.findAndCount({
        where: [
          { supplier_name: ILike(`%${search}%`) },
          { supplier_address: ILike(`%${search}%`) },
          { supplier_phone: ILike(`%${search}%`) },
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
    return this.supplierRepository.findOne({ where: { supplier_id: id } })
  }

  update(id: string, updateSupplierDto: UpdateSupplierDto) {
    return this.supplierRepository.update({ supplier_id: id }, updateSupplierDto);
  }

  remove(id: number) {
    return `This action removes a #${id} supplier`;
  }
}
