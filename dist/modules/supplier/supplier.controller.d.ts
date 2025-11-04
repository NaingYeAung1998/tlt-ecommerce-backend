import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
export declare class SupplierController {
    private readonly supplierService;
    constructor(supplierService: SupplierService);
    create(createSupplierDto: CreateSupplierDto): Promise<CreateSupplierDto & import("./entities/supplier.entity").Supplier>;
    findAll(query: {
        search: string;
        currentPage: number;
        perPage: number;
    }): Promise<import("../../core/utility/dto/pagination-list.dto").PaginationList | import("./entities/supplier.entity").Supplier[]>;
    findOne(id: string): Promise<import("./entities/supplier.entity").Supplier>;
    update(id: string, updateSupplierDto: UpdateSupplierDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): string;
}
