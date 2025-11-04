import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
export declare class WarehouseController {
    private readonly warehouseService;
    constructor(warehouseService: WarehouseService);
    create(createWarehouseDto: CreateWarehouseDto): Promise<CreateWarehouseDto & import("./entities/warehouse.entity").Warehouse>;
    findAll(query: {
        search: string;
        currentPage: number;
        perPage: number;
    }): Promise<import("../../core/utility/dto/pagination-list.dto").PaginationList | import("./entities/warehouse.entity").Warehouse[]>;
    findOne(id: string): Promise<import("./entities/warehouse.entity").Warehouse>;
    update(id: string, updateWarehouseDto: UpdateWarehouseDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): string;
}
