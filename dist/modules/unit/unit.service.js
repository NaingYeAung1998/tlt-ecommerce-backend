"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const unit_entity_1 = require("./entities/unit.entity");
const utility_service_1 = require("../../core/utility/utility.service");
const typeorm_2 = require("@nestjs/typeorm");
let UnitService = class UnitService {
    constructor(unitRepository, utilityService) {
        this.unitRepository = unitRepository;
        this.utilityService = utilityService;
    }
    create(createUnitDto) {
        return this.unitRepository.save(createUnitDto);
    }
    async findAll(search, currentPage, perPage) {
        if (perPage < 0) {
            return await this.unitRepository.find({ where: { is_delete: false }, order: { unit_symbol: 'ASC' } });
        }
        else {
            let [data, totalLength] = await this.unitRepository.createQueryBuilder("unit")
                .where("unit.is_delete = :is_delete AND ( unit.unit_name Like(:search) OR unit.unit_symbol Like(:search))", { is_delete: false, search: `%${search}%` })
                .leftJoinAndSelect('unit.parent_unit', 'parent')
                .orderBy("unit.created_on", "DESC")
                .skip(currentPage * perPage)
                .take(perPage)
                .getManyAndCount();
            return this.utilityService.createPaginationList(data, currentPage, perPage, totalLength);
        }
    }
    findOne(id) {
        return this.unitRepository.findOne({ where: { unit_id: id }, relations: ['parent_unit'] });
    }
    update(id, updateUnitDto) {
        return this.unitRepository.update({ unit_id: id }, updateUnitDto);
    }
    async roundupUnit(quantity_per_bag, per_bag_unit_id) {
        let units = await this.unitRepository.find();
        units.forEach((unit) => {
        });
    }
    async getUnitHierarchy(unit_id) {
        let units = await this.unitRepository.find({ relations: ['parent_unit'] });
        let unit = units.find(x => x.unit_id == unit_id);
        let parentUnits = this.getParentUnits(units, unit, []);
        let childUnits = this.getChildUnits(units, unit, []);
        let unitHierarchy = [...parentUnits, unit, ...childUnits];
        return unitHierarchy;
    }
    getParentUnits(units, unit, result) {
        if (unit.parent_unit) {
            let parent_unit = units.find(x => x.unit_id == unit.parent_unit.unit_id);
            if (parent_unit) {
                result.unshift(parent_unit);
                return this.getParentUnits(units, parent_unit, result);
            }
            else {
                return result;
            }
        }
        else {
            return result;
        }
    }
    getChildUnits(units, unit, result) {
        let child_unit = units.find(x => x.parent_unit?.unit_id == unit.unit_id);
        if (child_unit) {
            result.push(child_unit);
            return this.getChildUnits(units, child_unit, result);
        }
        else {
            return result;
        }
    }
    async remove(id) {
        let unit = await this.findOne(id);
        if (!unit) {
            throw new common_1.HttpException("Unit not found", common_1.HttpStatus.NOT_FOUND);
        }
        unit.is_delete = true;
        return this.unitRepository.update({ unit_id: id }, unit);
    }
};
exports.UnitService = UnitService;
exports.UnitService = UnitService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(unit_entity_1.Unit)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        utility_service_1.UtilityService])
], UnitService);
//# sourceMappingURL=unit.service.js.map