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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const customer_entity_1 = require("./entities/customer.entity");
const utility_service_1 = require("../../core/utility/utility.service");
let CustomerService = class CustomerService {
    constructor(customerRepository, utilityService) {
        this.customerRepository = customerRepository;
        this.utilityService = utilityService;
    }
    create(createCustomerDto) {
        return this.customerRepository.save(createCustomerDto);
    }
    async findAll(search, currentPage, perPage) {
        if (perPage < 0) {
            return await this.customerRepository.find({ where: { is_delete: false }, order: { customer_name: 'ASC' } });
        }
        else {
            let [data, totalLength] = await this.customerRepository.createQueryBuilder("customer")
                .where("customer.is_delete = :is_delete AND ( customer.customer_name Like(:search) OR customer.customer_address Like(:search) OR customer.customer_phone Like(:search) OR customer.note Like(:search))", { is_delete: false, search: `%${search}%` })
                .orderBy("customer.created_on", "DESC")
                .skip(currentPage * perPage)
                .take(perPage)
                .getManyAndCount();
            return this.utilityService.createPaginationList(data, currentPage, perPage, totalLength);
        }
    }
    findOne(id) {
        return this.customerRepository.findOne({ where: { customer_id: id } });
    }
    update(id, updateCustomerDto) {
        return this.customerRepository.update({ customer_id: id }, updateCustomerDto);
    }
    async remove(id) {
        let customer = await this.findOne(id);
        if (!customer) {
            throw new common_1.HttpException("Customer not found", common_1.HttpStatus.NOT_FOUND);
        }
        customer.is_delete = true;
        return this.customerRepository.update({ customer_id: id }, customer);
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        utility_service_1.UtilityService])
], CustomerService);
//# sourceMappingURL=customer.service.js.map