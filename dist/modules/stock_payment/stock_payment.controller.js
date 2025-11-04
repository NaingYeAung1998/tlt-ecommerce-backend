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
exports.StockPaymentController = void 0;
const common_1 = require("@nestjs/common");
const stock_payment_service_1 = require("./stock_payment.service");
const create_stock_payment_dto_1 = require("./dto/create-stock_payment.dto");
const update_stock_payment_dto_1 = require("./dto/update-stock_payment.dto");
const swagger_1 = require("@nestjs/swagger");
let StockPaymentController = class StockPaymentController {
    constructor(stockPaymentService) {
        this.stockPaymentService = stockPaymentService;
    }
    create(createStockPaymentDto) {
        return this.stockPaymentService.create(createStockPaymentDto);
    }
    findAll(query) {
        return this.stockPaymentService.findAll(query.search, query.currentPage, query.perPage);
    }
    findByProduct(query) {
        return this.stockPaymentService.findByStock(query.stock_id, query.search, query.currentPage, query.perPage);
    }
    findOne(id) {
        return this.stockPaymentService.findOne(id);
    }
    findInfo(id) {
        return this.stockPaymentService.getStockPaymentInfo(id);
    }
    update(id, updateStockPaymentDto) {
        return this.stockPaymentService.update(id, updateStockPaymentDto);
    }
    remove(id) {
        return this.stockPaymentService.remove(+id);
    }
};
exports.StockPaymentController = StockPaymentController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_stock_payment_dto_1.CreateStockPaymentDto]),
    __metadata("design:returntype", void 0)
], StockPaymentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StockPaymentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/getByStock'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StockPaymentController.prototype, "findByProduct", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StockPaymentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('/getInfo/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StockPaymentController.prototype, "findInfo", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_stock_payment_dto_1.UpdateStockPaymentDto]),
    __metadata("design:returntype", void 0)
], StockPaymentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StockPaymentController.prototype, "remove", null);
exports.StockPaymentController = StockPaymentController = __decorate([
    (0, swagger_1.ApiTags)('Stock'),
    (0, common_1.Controller)('stock/payment'),
    __metadata("design:paramtypes", [stock_payment_service_1.StockPaymentService])
], StockPaymentController);
//# sourceMappingURL=stock_payment.controller.js.map