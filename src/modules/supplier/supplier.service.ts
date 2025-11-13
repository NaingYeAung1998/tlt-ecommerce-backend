import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
      return await this.supplierRepository.find({ where: { isDelete: false }, order: { supplier_name: 'ASC' } });
    } else {
      let [data, toatlLength] = await this.supplierRepository.createQueryBuilder("supplier")
        .where("supplier.isDelete = :isDelete AND ( supplier.supplier_name Like(:search) OR supplier.supplier_address Like(:search) OR supplier.supplier_phone Like(:search) OR supplier.note Like(:search))", { isDelete: false, search: `%${search}%` })
        .orderBy("supplier.created_on", "DESC")
        .skip(currentPage * perPage)
        .take(perPage)
        .getManyAndCount();

      return this.utilityService.createPaginationList(data, currentPage, perPage, toatlLength)
    }

  }

  findOne(id: string) {
    return this.supplierRepository.findOne({ where: { supplier_id: id } })
  }

  update(id: string, updateSupplierDto: UpdateSupplierDto) {
    return this.supplierRepository.update({ supplier_id: id }, updateSupplierDto);
  }

  async remove(id: string) {
    let supplier = await this.findOne(id);
    if (!supplier) {
      throw new HttpException("Supplier not found", HttpStatus.NOT_FOUND);
    }
    supplier.isDelete = true;
    return this.supplierRepository.update({ supplier_id: id }, supplier);
  }
}
