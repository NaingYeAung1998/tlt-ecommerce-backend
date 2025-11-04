import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './entities/supplier.entity';
import { Repository } from 'typeorm';
import { UtilityService } from 'src/core/utility/utility.service';
export declare class SupplierService {
    private supplierRepository;
    private utilityService;
    constructor(supplierRepository: Repository<Supplier>, utilityService: UtilityService);
    create(createSupplierDto: CreateSupplierDto): Promise<CreateSupplierDto & Supplier>;
    findAll(search: string, currentPage: number, perPage: number): Promise<import("../../core/utility/dto/pagination-list.dto").PaginationList | Supplier[]>;
    findOne(id: string): Promise<Supplier>;
    update(id: string, updateSupplierDto: UpdateSupplierDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): string;
}
