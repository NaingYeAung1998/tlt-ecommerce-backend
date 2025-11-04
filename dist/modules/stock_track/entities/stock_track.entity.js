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
exports.StockTrackStatus = exports.StockTrack = void 0;
const stock_entity_1 = require("../../stock/entities/stock.entity");
const warehouse_entity_1 = require("../../warehouse/entities/warehouse.entity");
const typeorm_1 = require("typeorm");
let StockTrack = class StockTrack {
};
exports.StockTrack = StockTrack;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ generated: 'uuid' }),
    __metadata("design:type", String)
], StockTrack.prototype, "track_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal' }),
    __metadata("design:type", Number)
], StockTrack.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], StockTrack.prototype, "checked_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], StockTrack.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StockTrack.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], StockTrack.prototype, "created_on", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], StockTrack.prototype, "updated_on", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], StockTrack.prototype, "deleted_on", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => stock_entity_1.Stock, stock => stock.stock_tracks),
    (0, typeorm_1.JoinColumn)({ name: 'stock_id' }),
    __metadata("design:type", stock_entity_1.Stock)
], StockTrack.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => warehouse_entity_1.Warehouse),
    (0, typeorm_1.JoinColumn)({ name: 'warehouse_id' }),
    __metadata("design:type", warehouse_entity_1.Warehouse)
], StockTrack.prototype, "warehouse", void 0);
exports.StockTrack = StockTrack = __decorate([
    (0, typeorm_1.Entity)({ name: 'stock_track' })
], StockTrack);
var StockTrackStatus;
(function (StockTrackStatus) {
    StockTrackStatus[StockTrackStatus["DELIVERD"] = 0] = "DELIVERD";
    StockTrackStatus[StockTrackStatus["STORED"] = 1] = "STORED";
})(StockTrackStatus || (exports.StockTrackStatus = StockTrackStatus = {}));
//# sourceMappingURL=stock_track.entity.js.map