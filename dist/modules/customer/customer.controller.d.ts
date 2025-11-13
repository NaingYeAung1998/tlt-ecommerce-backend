import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    create(createCustomerDto: CreateCustomerDto): Promise<CreateCustomerDto & import("./entities/customer.entity").Customer>;
    findAll(query: {
        search: string;
        currentPage: number;
        perPage: number;
    }): Promise<import("./entities/customer.entity").Customer[] | import("../../core/utility/dto/pagination-list.dto").PaginationList>;
    findOne(id: string): Promise<import("./entities/customer.entity").Customer>;
    update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").UpdateResult>;
}
