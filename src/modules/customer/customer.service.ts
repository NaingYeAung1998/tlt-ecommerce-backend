import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { UtilityService } from 'src/core/utility/utility.service';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    private utilityService: UtilityService

  ) { }

  create(createCustomerDto: CreateCustomerDto) {
    return this.customerRepository.save(createCustomerDto);
  }

  async findAll(search: string, currentPage: number, perPage: number) {
    if (perPage < 0) {
      return await this.customerRepository.find({ where: { is_delete: false }, order: { customer_name: 'ASC' } });
    } else {
      let [data, totalLength] = await this.customerRepository.createQueryBuilder("customer")
        .where("customer.is_delete = :is_delete AND ( customer.customer_name Like(:search) OR customer.customer_address Like(:search) OR customer.customer_phone Like(:search) OR customer.note Like(:search))", { is_delete: false, search: `%${search}%` })
        .orderBy("customer.created_on", "DESC")
        .skip(currentPage * perPage)
        .take(perPage)
        .getManyAndCount();

      return this.utilityService.createPaginationList(data, currentPage, perPage, totalLength)
    }

  }

  findOne(id: string) {
    return this.customerRepository.findOne({ where: { customer_id: id } })
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.customerRepository.update({ customer_id: id }, updateCustomerDto);
  }

  async remove(id: string) {
    let customer = await this.findOne(id);
    if (!customer) {
      throw new HttpException("Customer not found", HttpStatus.NOT_FOUND);
    }
    customer.is_delete = true;
    return this.customerRepository.update({ customer_id: id }, customer);
  }
}
