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
exports.StockService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const stock_entity_1 = require("./entities/stock.entity");
const utility_service_1 = require("../../core/utility/utility.service");
let StockService = class StockService {
    constructor(stockRepository, utilityService) {
        this.stockRepository = stockRepository;
        this.utilityService = utilityService;
    }
    create(createStockDto) {
        return this.stockRepository.save(createStockDto);
    }
    async findAll(search, currentPage, perPage) {
        let [data, toatlLength] = await this.stockRepository.findAndCount({
            where: [
                { stock_code: (0, typeorm_2.ILike)(`%${search}%`) }
            ],
            order: { created_on: 'DESC' },
            skip: currentPage * perPage,
            take: perPage,
            relations: ['product', 'supplier', 'unit']
        });
        let stockList = this.convertStocksToList(data);
        return this.utilityService.createPaginationList(stockList, currentPage, perPage, toatlLength);
    }
    async findByProduct(product_id, search, currentPage, perPage) {
        let [data, toatlLength] = await this.stockRepository.findAndCount({
            where: [
                { product: { product_id: product_id }, stock_code: (0, typeorm_2.ILike)(`%${search}%`) }
            ],
            order: { created_on: 'DESC' },
            skip: currentPage * perPage,
            take: perPage,
            relations: ['product', 'supplier', 'unit']
        });
        let stockList = this.convertStocksToList(data);
        return this.utilityService.createPaginationList(stockList, currentPage, perPage, toatlLength);
    }
    async findOne(id) {
        let stock = await this.stockRepository.findOne({ where: { stock_id: id }, relations: ['product', 'supplier', 'unit'] });
        if (!stock) {
            throw new common_1.HttpException('Stock not found', common_1.HttpStatus.NOT_FOUND);
        }
        return this.convertStockToViewDto(stock);
    }
    update(id, updateStockDto) {
        return this.stockRepository.update({ stock_id: id }, updateStockDto);
    }
    remove(id) {
        return `This action removes a #${id} stock`;
    }
    convertStocksToList(stocks) {
        let stockList = [];
        stocks.forEach((stock, index) => {
            let stockObj = this.convertStockToViewDto(stock);
            stockList.push(stockObj);
        });
        return stockList;
    }
    convertStockToViewDto(stock) {
        let nfObject = new Intl.NumberFormat('en-US');
        let stockObj = {
            stock_id: stock.stock_id,
            stock_code: stock.stock_code,
            stock_product: stock.product.product_name + "(" + stock.product.product_code + ")",
            stock_supplier: stock.supplier.supplier_name + "(" + stock.supplier.supplier_phone + ")",
            stock_unit: stock.unit.unit_symbol,
            quantity: stock.quantity,
            buying_price: stock.buying_price,
            selling_price: stock.selling_price,
            fix_price: stock.fix_price,
            buying_price_formatted: nfObject.format(stock.buying_price) + " MMK",
            selling_price_formatted: nfObject.format(stock.selling_price) + " MMK",
            fix_price_formatted: nfObject.format(stock.fix_price) + " MMMK",
            note: stock.note,
            created_on: stock.created_on
        };
        return stockObj;
    }
};
exports.StockService = StockService;
exports.StockService = StockService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(stock_entity_1.Stock)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        utility_service_1.UtilityService])
], StockService);
//# sourceMappingURL=stock.service.js.map