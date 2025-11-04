"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockTrackModule = void 0;
const common_1 = require("@nestjs/common");
const stock_track_service_1 = require("./stock_track.service");
const stock_track_controller_1 = require("./stock_track.controller");
const typeorm_1 = require("@nestjs/typeorm");
const stock_track_entity_1 = require("./entities/stock_track.entity");
const utility_module_1 = require("../../core/utility/utility.module");
const stock_module_1 = require("../stock/stock.module");
let StockTrackModule = class StockTrackModule {
};
exports.StockTrackModule = StockTrackModule;
exports.StockTrackModule = StockTrackModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([stock_track_entity_1.StockTrack]), utility_module_1.UtilityModule, stock_module_1.StockModule],
        controllers: [stock_track_controller_1.StockTrackController],
        providers: [stock_track_service_1.StockTrackService],
    })
], StockTrackModule);
//# sourceMappingURL=stock_track.module.js.map