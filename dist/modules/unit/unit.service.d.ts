import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { Repository } from 'typeorm';
import { Unit } from './entities/unit.entity';
import { UtilityService } from 'src/core/utility/utility.service';
export declare class UnitService {
    private unitRepository;
    private utilityService;
    constructor(unitRepository: Repository<Unit>, utilityService: UtilityService);
    create(createUnitDto: CreateUnitDto): Promise<CreateUnitDto & Unit>;
    findAll(search: string, currentPage: number, perPage: number): Promise<import("../../core/utility/dto/pagination-list.dto").PaginationList | Unit[]>;
    findOne(id: string): Promise<Unit>;
    update(id: string, updateUnitDto: UpdateUnitDto): Promise<import("typeorm").UpdateResult>;
    roundupUnit(quantity_per_bag?: number, per_bag_unit_id?: string): Promise<void>;
    getUnitHierarchy(unit_id: string): Promise<any[]>;
    getParentUnits(units: Unit[], unit: Unit, result: Unit[]): any;
    getChildUnits(units: Unit[], unit: Unit, result: Unit[]): any;
    remove(id: string): Promise<import("typeorm").UpdateResult>;
}
