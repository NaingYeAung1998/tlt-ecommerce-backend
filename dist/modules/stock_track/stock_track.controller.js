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
exports.StockTrackController = void 0;
const common_1 = require("@nestjs/common");
const stock_track_service_1 = require("./stock_track.service");
const create_stock_track_dto_1 = require("./dto/create-stock_track.dto");
const update_stock_track_dto_1 = require("./dto/update-stock_track.dto");
const swagger_1 = require("@nestjs/swagger");
let StockTrackController = class StockTrackController {
    constructor(stockTrackService) {
        this.stockTrackService = stockTrackService;
    }
    create(createStockTrackDto) {
        return this.stockTrackService.create(createStockTrackDto);
    }
    findAll(query) {
        return this.stockTrackService.findAll(query.search, query.currentPage, query.perPage);
    }
    findByProduct(query) {
        return this.stockTrackService.findByStock(query.stock_id, query.search, query.currentPage, query.perPage);
    }
    findOne(id) {
        return this.stockTrackService.findOne(id);
    }
    findInfo(id) {
        return this.stockTrackService.getStockTrackInfo(id);
    }
    update(id, updateStockTrackDto) {
        return this.stockTrackService.update(id, updateStockTrackDto);
    }
    remove(id) {
        return this.stockTrackService.remove(+id);
    }
};
exports.StockTrackController = StockTrackController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_stock_track_dto_1.CreateStockTrackDto]),
    __metadata("design:returntype", void 0)
], StockTrackController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StockTrackController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/getByStock'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StockTrackController.prototype, "findByProduct", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StockTrackController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('/getInfo/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StockTrackController.prototype, "findInfo", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_stock_track_dto_1.UpdateStockTrackDto]),
    __metadata("design:returntype", void 0)
], StockTrackController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StockTrackController.prototype, "remove", null);
exports.StockTrackController = StockTrackController = __decorate([
    (0, swagger_1.ApiTags)('Stock'),
    (0, common_1.Controller)('stock/track'),
    __metadata("design:paramtypes", [stock_track_service_1.StockTrackService])
], StockTrackController);
//# sourceMappingURL=stock_track.controller.js.map