import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { UtilityService } from 'src/core/utility/utility.service';
export declare class CustomerService {
    private customerRepository;
    private utilityService;
    constructor(customerRepository: Repository<Customer>, utilityService: UtilityService);
    create(createCustomerDto: CreateCustomerDto): Promise<CreateCustomerDto & Customer>;
    findAll(search: string, currentPage: number, perPage: number): Promise<import("../../core/utility/dto/pagination-list.dto").PaginationList | Customer[]>;
    findOne(id: string): Promise<Customer>;
    update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").UpdateResult>;
}
