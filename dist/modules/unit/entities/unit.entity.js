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
exports.Unit = void 0;
const typeorm_1 = require("typeorm");
let Unit = class Unit {
};
exports.Unit = Unit;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ generated: 'uuid' }),
    __metadata("design:type", String)
], Unit.prototype, "unit_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Unit.prototype, "unit_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Unit.prototype, "unit_symbol", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'decimal' }),
    __metadata("design:type", Number)
], Unit.prototype, "quantity_per_parent_unit", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false, type: 'boolean', nullable: true }),
    __metadata("design:type", Boolean)
], Unit.prototype, "is_delete", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Unit.prototype, "created_on", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Unit.prototype, "updated_on", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Unit.prototype, "deleted_on", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Unit, unit => unit.child_units, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'parent_unit_id' }),
    __metadata("design:type", Unit)
], Unit.prototype, "parent_unit", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Unit, unit => unit.parent_unit),
    __metadata("design:type", Array)
], Unit.prototype, "child_units", void 0);
exports.Unit = Unit = __decorate([
    (0, typeorm_1.Entity)()
], Unit);
//# sourceMappingURL=unit.entity.js.map