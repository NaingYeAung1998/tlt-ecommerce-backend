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
exports.WarehouseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const warehouse_entity_1 = require("./entities/warehouse.entity");
const utility_service_1 = require("../../core/utility/utility.service");
let WarehouseService = class WarehouseService {
    constructor(warehouseRepository, utilityService) {
        this.warehouseRepository = warehouseRepository;
        this.utilityService = utilityService;
    }
    create(createWarehouseDto) {
        return this.warehouseRepository.save(createWarehouseDto);
    }
    async findAll(search, currentPage, perPage) {
        if (perPage < 0) {
            return await this.warehouseRepository.find({ where: { isDelete: false }, order: { warehouse_name: 'ASC' } });
        }
        else {
            let [data, toatlLength] = await this.warehouseRepository.createQueryBuilder("warehouse")
                .where("warehouse.isDelete = :isDelete AND ( warehouse.warehouse_name Like(:search) OR warehouse.warehouse_address Like(:search) OR warehouse.warehouse_phone Like(:search) OR warehouse.note Like(:search))", { isDelete: false, search: `%${search}%` })
                .orderBy("warehouse.created_on", "DESC")
                .skip(currentPage * perPage)
                .take(perPage)
                .getManyAndCount();
            return this.utilityService.createPaginationList(data, currentPage, perPage, toatlLength);
        }
    }
    findOne(id) {
        return this.warehouseRepository.findOne({ where: { warehouse_id: id } });
    }
    update(id, updateWarehouseDto) {
        return this.warehouseRepository.update({ warehouse_id: id }, updateWarehouseDto);
    }
    async remove(id) {
        let warehouse = await this.findOne(id);
        if (!warehouse) {
            throw new common_1.HttpException("Warehouse Not Found", common_1.HttpStatus.NOT_FOUND);
        }
        warehouse.isDelete = true;
        return this.warehouseRepository.update({ warehouse_id: id }, warehouse);
    }
};
exports.WarehouseService = WarehouseService;
exports.WarehouseService = WarehouseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(warehouse_entity_1.Warehouse)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        utility_service_1.UtilityService])
], WarehouseService);
//# sourceMappingURL=warehouse.service.js.map