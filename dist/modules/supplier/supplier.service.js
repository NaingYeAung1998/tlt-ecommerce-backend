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
exports.SupplierService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const supplier_entity_1 = require("./entities/supplier.entity");
const typeorm_2 = require("typeorm");
const utility_service_1 = require("../../core/utility/utility.service");
let SupplierService = class SupplierService {
    constructor(supplierRepository, utilityService) {
        this.supplierRepository = supplierRepository;
        this.utilityService = utilityService;
    }
    create(createSupplierDto) {
        return this.supplierRepository.save(createSupplierDto);
    }
    async findAll(search, currentPage, perPage) {
        if (perPage < 0) {
            return await this.supplierRepository.find({ where: { is_delete: false }, order: { supplier_name: 'ASC' } });
        }
        else {
            let [data, totalLength] = await this.supplierRepository.createQueryBuilder("supplier")
                .where("supplier.is_delete = :is_delete AND ( supplier.supplier_name Like(:search) OR supplier.supplier_address Like(:search) OR supplier.supplier_phone Like(:search) OR supplier.note Like(:search))", { is_delete: false, search: `%${search}%` })
                .orderBy("supplier.created_on", "DESC")
                .skip(currentPage * perPage)
                .take(perPage)
                .getManyAndCount();
            return this.utilityService.createPaginationList(data, currentPage, perPage, totalLength);
        }
    }
    findOne(id) {
        return this.supplierRepository.findOne({ where: { supplier_id: id } });
    }
    update(id, updateSupplierDto) {
        return this.supplierRepository.update({ supplier_id: id }, updateSupplierDto);
    }
    async remove(id) {
        let supplier = await this.findOne(id);
        if (!supplier) {
            throw new common_1.HttpException("Supplier not found", common_1.HttpStatus.NOT_FOUND);
        }
        supplier.is_delete = true;
        return this.supplierRepository.update({ supplier_id: id }, supplier);
    }
};
exports.SupplierService = SupplierService;
exports.SupplierService = SupplierService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(supplier_entity_1.Supplier)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        utility_service_1.UtilityService])
], SupplierService);
//# sourceMappingURL=supplier.service.js.map