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
let ProductService = class ProductService {
    constructor(productRepository, utilityService) {
        this.productRepository = productRepository;
        this.utilityService = utilityService;
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
            let data = await this.productRepository.find({ order: { product_name: 'ASC' }, relations: ['category', 'grade'] });
            products = data;
            totalLength = data.length;
        }
        else {
            let [data, length] = await this.productRepository.findAndCount({
                where: [
                    { product_code: (0, typeorm_2.ILike)(`%${search}%`) },
                    { product_name: (0, typeorm_2.ILike)(`%${search}%`) },
                    { product_description: (0, typeorm_2.ILike)(`%${search}%`) }
                ],
                order: { created_on: 'DESC' },
                skip: currentPage * perPage,
                take: perPage,
                relations: ['category', 'grade']
            });
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
                product_category: product.category.category_name,
                product_grade: product.grade.grade_name,
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
        return this.productRepository.findOne({ where: { product_id: id }, relations: ['category', 'grade'] });
    }
    update(id, updateProductDto) {
        return this.productRepository.update({ product_id: id }, updateProductDto);
    }
    remove(id) {
        return `This action removes a #${id} product`;
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        utility_service_1.UtilityService])
], ProductService);
//# sourceMappingURL=product.service.js.map