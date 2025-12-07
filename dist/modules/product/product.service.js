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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./entities/product.entity");
const typeorm_2 = require("typeorm");
const utility_service_1 = require("../../core/utility/utility.service");
const unit_service_1 = require("../unit/unit.service");
let ProductService = class ProductService {
    constructor(productRepository, utilityService, unitService) {
        this.productRepository = productRepository;
        this.utilityService = utilityService;
        this.unitService = unitService;
    }
    async create(createProductDto) {
        try {
            let existingProduct = await this.productRepository.findOne({ where: { product_code: createProductDto.product_code } });
            if (existingProduct) {
                throw new common_1.HttpException('Duplicate Product Code', common_1.HttpStatus.BAD_REQUEST);
            }
            return this.productRepository.save(createProductDto);
        }
        catch (err) {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll(search, currentPage, perPage) {
        let products = [];
        let totalLength = 0;
        if (perPage < 0) {
            let data = await this.productRepository.find({ where: { is_delete: false }, order: { product_name: 'ASC' }, relations: ['category', 'grade'] });
            products = data;
            totalLength = data.length;
        }
        else {
            let [data, length] = await this.productRepository.createQueryBuilder("product")
                .where("product.is_delete = :is_delete AND ( product.product_code Like(:search) OR product.product_name Like(:search) OR product.product_description Like(:search))", { is_delete: false, search: `%${search}%` })
                .orderBy("product.created_on", "DESC")
                .skip(currentPage * perPage)
                .take(perPage)
                .leftJoinAndSelect("product.category", "category")
                .leftJoinAndSelect("product.grade", "grade")
                .leftJoinAndSelect("product.per_bag_unit", "per_bag_unit")
                .getManyAndCount();
            products = data;
            totalLength = length;
        }
        let productList = [];
        products.forEach((product, index) => {
            let productObj = {
                product_id: product.product_id,
                product_name: product.product_name,
                product_code: product.product_code,
                product_description: product.product_description,
                product_category: product.category?.category_name,
                product_grade: product.grade?.grade_name,
                product_quantity_per_bag: product.per_bag_unit ? `${product.quantity_per_bag} ${product.per_bag_unit.unit_name}` : "",
                note: product.note,
                created_on: product.created_on
            };
            productList.push(productObj);
        });
        if (perPage < 0) {
            return productList;
        }
        else {
            return this.utilityService.createPaginationList(productList, currentPage, perPage, totalLength);
        }
    }
    findOne(id) {
        return this.productRepository.findOne({ where: { product_id: id }, relations: ['category', 'grade', 'per_bag_unit'] });
    }
    async findProductUnitHiearchy(id) {
        let product = await this.findOne(id);
        if (!product || !product.per_bag_unit) {
            throw new common_1.HttpException('Please Define Product Unit', common_1.HttpStatus.BAD_REQUEST);
        }
        let unitHiearchy = await this.unitService.getUnitHierarchy(product.per_bag_unit.unit_id);
        let bagUnit = { unit_id: process.env.BAG_UNIT_ID, unit_name: process.env.BAG_UNIT_NAME };
        let bagConnectedUnitIndex = unitHiearchy.findIndex(x => x.unit_id == product.per_bag_unit.unit_id);
        if (bagConnectedUnitIndex < 0) {
            throw new common_1.HttpException('Please Define Product Unit', common_1.HttpStatus.BAD_REQUEST);
        }
        unitHiearchy[bagConnectedUnitIndex].parent_unit = bagUnit;
        unitHiearchy[bagConnectedUnitIndex].quantity_per_parent_unit = product.quantity_per_bag;
        unitHiearchy.splice(0, bagConnectedUnitIndex);
        unitHiearchy.unshift(bagUnit);
        return unitHiearchy;
    }
    update(id, updateProductDto) {
        return this.productRepository.update({ product_id: id }, updateProductDto);
    }
    async remove(id) {
        let product = await this.findOne(id);
        if (!product) {
            throw new common_1.HttpException("Product not found", common_1.HttpStatus.NOT_FOUND);
        }
        product.is_delete = true;
        return this.productRepository.update({ product_id: id }, product);
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        utility_service_1.UtilityService,
        unit_service_1.UnitService])
], ProductService);
//# sourceMappingURL=product.service.js.map