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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStockDto = exports.CreateStockWarehouseDto = exports.CreateStockUnitDto = exports.CreateStockSupplierDto = exports.CreateStockProductDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_warehouse_dto_1 = require("../../warehouse/dto/create-warehouse.dto");
class CreateStockProductDto {
}
exports.CreateStockProductDto = CreateStockProductDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateStockProductDto.prototype, "product_id", void 0);
class CreateStockSupplierDto {
}
exports.CreateStockSupplierDto = CreateStockSupplierDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateStockSupplierDto.prototype, "supplier_id", void 0);
class CreateStockUnitDto {
}
exports.CreateStockUnitDto = CreateStockUnitDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateStockUnitDto.prototype, "unit_id", void 0);
class CreateStockWarehouseDto {
}
exports.CreateStockWarehouseDto = CreateStockWarehouseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateStockWarehouseDto.prototype, "warehouse_id", void 0);
class CreateStockDto {
}
exports.CreateStockDto = CreateStockDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateStockDto.prototype, "stock_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", CreateStockProductDto)
], CreateStockDto.prototype, "product", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", CreateStockSupplierDto)
], CreateStockDto.prototype, "supplier", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", create_warehouse_dto_1.CreateWarehouseDto)
], CreateStockDto.prototype, "warehouse", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", CreateStockUnitDto)
], CreateStockDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreateStockDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreateStockDto.prototype, "buying_price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreateStockDto.prototype, "selling_price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreateStockDto.prototype, "fix_price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateStockDto.prototype, "note", void 0);
//# sourceMappingURL=create-stock.dto.js.map