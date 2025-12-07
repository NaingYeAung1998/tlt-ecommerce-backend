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
exports.StockTrackService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const stock_track_entity_1 = require("./entities/stock_track.entity");
const typeorm_2 = require("typeorm");
const utility_service_1 = require("../../core/utility/utility.service");
const stock_service_1 = require("../stock/stock.service");
let StockTrackService = class StockTrackService {
    constructor(stockTrackRepository, utilityService, stockService) {
        this.stockTrackRepository = stockTrackRepository;
        this.utilityService = utilityService;
        this.stockService = stockService;
    }
    async create(createStockTrackDto) {
        let stockTrackInfo = await this.getStockTrackInfo(createStockTrackDto.stock.stock_id);
        if (createStockTrackDto.status == stock_track_entity_1.StockTrackStatus.DELIVERD) {
            if ((stockTrackInfo.total_delivered + parseInt(createStockTrackDto.quantity.toString())) > parseInt(stockTrackInfo.quantity.toString())) {
                throw new common_1.HttpException('Deliverable quantity exceeds', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        if (createStockTrackDto.status == stock_track_entity_1.StockTrackStatus.STORED) {
            if ((stockTrackInfo.total_stored + parseInt(createStockTrackDto.quantity.toString())) > parseInt(stockTrackInfo.quantity.toString())) {
                throw new common_1.HttpException('Storeable quantity exceeds', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        return this.stockTrackRepository.save(createStockTrackDto);
    }
    async findAll(search, currentPage, perPage) {
        if (perPage < 0) {
            return await this.stockTrackRepository.find({ order: { checked_date: 'DESC' } });
        }
        else {
            let [data, toatlLength] = await this.stockTrackRepository.findAndCount({
                where: [
                    { note: (0, typeorm_2.ILike)(`%${search}%`) }
                ],
                order: { created_on: 'DESC' },
                skip: currentPage * perPage,
                take: perPage
            });
            return this.utilityService.createPaginationList(data, currentPage, perPage, toatlLength);
        }
    }
    async findByStock(stock_id, search, currentPage, perPage) {
        if (perPage < 0) {
            let data = await this.stockTrackRepository.find({
                where: [{ stock: { stock_id: stock_id }, note: (0, typeorm_2.ILike)(`%${search}%`) }],
                order: { checked_date: 'DESC' },
                relations: ['stock', 'warehouse']
            });
            return this.convertStockTrackListsToViewListDto(data);
        }
        else {
            let [data, totalLength] = await this.stockTrackRepository.findAndCount({
                where: [
                    { stock: { stock_id: stock_id }, note: (0, typeorm_2.ILike)(`%${search}%`) }
                ],
                order: { created_on: 'DESC' },
                skip: currentPage * perPage,
                take: perPage,
                relations: ['stock', 'warehouse']
            });
            let trackViewList = this.convertStockTrackListsToViewListDto(data);
            return this.utilityService.createPaginationList(trackViewList, currentPage, perPage, totalLength);
        }
    }
    async getStockTrackInfo(stock_id) {
        let stockInfo = await this.stockTrackRepository.createQueryBuilder("stock_track")
            .leftJoin("stock_track.stock", "stock")
            .leftJoin("stock.product", "product")
            .groupBy("stock.stock_id")
            .where("stock.stock_id = :stock_id", { stock_id })
            .select("stock.*")
            .addSelect("CONCAT(product.product_name, ' (', product.product_code, ')' )", "stock_product")
            .addSelect("SUM(CASE WHEN stock_track.status =" + stock_track_entity_1.StockTrackStatus.DELIVERD + " THEN stock_track.quantity ELSE 0 END)", "total_delivered")
            .addSelect("SUM(CASE WHEN stock_track.status =" + stock_track_entity_1.StockTrackStatus.STORED + " THEN stock_track.quantity ELSE 0 END)", "total_stored")
            .getRawOne();
        return stockInfo;
    }
    findOne(id) {
        return this.stockTrackRepository.findOne({ where: { track_id: id }, relations: ['warehouse'] });
    }
    async update(id, updateStockTrackDto) {
        let stockTrackInfo = await this.getStockTrackInfo(updateStockTrackDto.stock.stock_id);
        let trackInfo = await this.findOne(id);
        if (updateStockTrackDto.status == stock_track_entity_1.StockTrackStatus.DELIVERD) {
            if ((stockTrackInfo.total_delivered + parseInt(updateStockTrackDto.quantity.toString()) - parseInt(trackInfo.quantity.toString())) > parseInt(stockTrackInfo.quantity.toString())) {
                throw new common_1.HttpException('Deliverable quantity exceeds', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        if (updateStockTrackDto.status == stock_track_entity_1.StockTrackStatus.STORED) {
            if ((stockTrackInfo.total_stored + parseInt(updateStockTrackDto.quantity.toString()) - parseInt(trackInfo.quantity.toString())) > parseInt(stockTrackInfo.quantity.toString())) {
                throw new common_1.HttpException('Storeable quantity exceeds', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        return this.stockTrackRepository.update({ track_id: id }, updateStockTrackDto);
    }
    remove(id) {
        return `This action removes a #${id} stockTrack`;
    }
    convertStockTrackListsToViewListDto(tracks) {
        let trackList = [];
        tracks.forEach((track, index) => {
            let trackObj = this.convertStockTrackToViewDto(track);
            trackList.push(trackObj);
        });
        return trackList;
    }
    convertStockTrackToViewDto(track) {
        let stockTrackObj = {
            track_id: track.track_id,
            quantity: track.quantity,
            checked_date: track.checked_date,
            status: track.status,
            created_on: track.created_on,
            note: track.note,
            warehouse_name: track.warehouse?.warehouse_name
        };
        return stockTrackObj;
    }
};
exports.StockTrackService = StockTrackService;
exports.StockTrackService = StockTrackService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(stock_track_entity_1.StockTrack)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        utility_service_1.UtilityService,
        stock_service_1.StockService])
], StockTrackService);
//# sourceMappingURL=stock_track.service.js.map