import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { Repository } from 'typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { UtilityService } from 'src/core/utility/utility.service';
export declare class WarehouseService {
    private warehouseRepository;
    private utilityService;
    constructor(warehouseRepository: Repository<Warehouse>, utilityService: UtilityService);
    create(createWarehouseDto: CreateWarehouseDto): Promise<CreateWarehouseDto & Warehouse>;
    findAll(search: string, currentPage: number, perPage: number): Promise<import("../../core/utility/dto/pagination-list.dto").PaginationList | Warehouse[]>;
    findOne(id: string): Promise<Warehouse>;
    update(id: string, updateWarehouseDto: UpdateWarehouseDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").UpdateResult>;
}
