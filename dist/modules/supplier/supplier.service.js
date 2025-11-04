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
            return await this.supplierRepository.find({ order: { supplier_name: 'ASC' } });
        }
        else {
            let [data, toatlLength] = await this.supplierRepository.findAndCount({
                where: [
                    { supplier_name: (0, typeorm_2.ILike)(`%${search}%`) },
                    { supplier_address: (0, typeorm_2.ILike)(`%${search}%`) },
                    { supplier_phone: (0, typeorm_2.ILike)(`%${search}%`) },
                    { note: (0, typeorm_2.ILike)(`%${search}%`) }
                ],
                order: { created_on: 'DESC' },
                skip: currentPage * perPage,
                take: perPage
            });
            return this.utilityService.createPaginationList(data, currentPage, perPage, toatlLength);
        }
    }
    findOne(id) {
        return this.supplierRepository.findOne({ where: { supplier_id: id } });
    }
    update(id, updateSupplierDto) {
        return this.supplierRepository.update({ supplier_id: id }, updateSupplierDto);
    }
    remove(id) {
        return `This action removes a #${id} supplier`;
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