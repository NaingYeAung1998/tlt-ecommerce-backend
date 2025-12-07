import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
export declare class UnitController {
    private readonly unitService;
    constructor(unitService: UnitService);
    create(createUnitDto: CreateUnitDto): Promise<CreateUnitDto & import("./entities/unit.entity").Unit>;
    findAll(query: {
        search: string;
        currentPage: number;
        perPage: number;
    }): Promise<import("../../core/utility/dto/pagination-list.dto").PaginationList | import("./entities/unit.entity").Unit[]>;
    findOne(id: string): Promise<import("./entities/unit.entity").Unit>;
    getUnitHierarchy(id: string): Promise<any[]>;
    update(id: string, updateUnitDto: UpdateUnitDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").UpdateResult>;
}
