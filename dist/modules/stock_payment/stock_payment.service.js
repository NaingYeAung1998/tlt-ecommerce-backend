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
exports.StockPaymentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const stock_payment_entity_1 = require("./entities/stock_payment.entity");
const typeorm_2 = require("typeorm");
const utility_service_1 = require("../../core/utility/utility.service");
const stock_service_1 = require("../stock/stock.service");
let StockPaymentService = class StockPaymentService {
    constructor(stockPaymentRepository, utilityService, stockService) {
        this.stockPaymentRepository = stockPaymentRepository;
        this.utilityService = utilityService;
        this.stockService = stockService;
    }
    async create(createStockPaymentDto) {
        const stockPaymentInfo = await this.getStockPaymentInfo(createStockPaymentDto.stock.stock_id);
        if ((stockPaymentInfo.total_paid + parseInt(createStockPaymentDto.amount.toString())) > parseInt(stockPaymentInfo.buying_price.toString())) {
            throw new common_1.HttpException('Total Amount exceeds buying price', common_1.HttpStatus.BAD_REQUEST);
        }
        return this.stockPaymentRepository.save(createStockPaymentDto);
    }
    async findAll(search, currentPage, perPage) {
        if (perPage < 0) {
            return await this.stockPaymentRepository.find({ order: { payment_date: 'DESC' } });
        }
        else {
            let [data, toatlLength] = await this.stockPaymentRepository.findAndCount({
                where: [
                    { note: (0, typeorm_2.ILike)(`%${search}%`) },
                    { payment_channel: (0, typeorm_2.ILike)(`%${search}%`) }
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
            let data = await this.stockPaymentRepository.find({
                where: [{ stock: { stock_id: stock_id }, note: (0, typeorm_2.ILike)(`%${search}%`) }],
                order: { payment_date: 'DESC' }
            });
            let paymentList = this.convertPaymentsToList(data);
            return paymentList;
        }
        else {
            let [data, toatlLength] = await this.stockPaymentRepository.findAndCount({
                where: [{ stock: { stock_id: stock_id }, note: (0, typeorm_2.ILike)(`%${search}%`) }],
                order: { created_on: 'DESC' },
                skip: currentPage * perPage,
                take: perPage,
                relations: ['stock']
            });
            let paymentList = this.convertPaymentsToList(data);
            return this.utilityService.createPaginationList(paymentList, currentPage, perPage, toatlLength);
        }
    }
    async getStockPaymentInfo(stock_id) {
        let stockInfo = await this.stockService.findOne(stock_id);
        let stockPayments = await this.stockPaymentRepository.find({ where: { stock: { stock_id: stock_id } }, relations: ['stock'] });
        stockInfo.total_paid = 0;
        stockPayments.forEach((payment) => {
            stockInfo.total_paid += parseInt(payment.amount.toString());
        });
        let nfObject = new Intl.NumberFormat('en-US');
        stockInfo.total_paid_formatted = nfObject.format(stockInfo.total_paid) + " MMK";
        return stockInfo;
    }
    findOne(id) {
        return this.stockPaymentRepository.findOne({ where: { payment_id: id } });
    }
    async update(id, updateStockPaymentDto) {
        let stockPaymentInfo = await this.getStockPaymentInfo(updateStockPaymentDto.stock.stock_id);
        let paymentInfo = await this.findOne(id);
        if ((stockPaymentInfo.total_paid + parseInt(updateStockPaymentDto.amount.toString()) - parseInt(paymentInfo.amount.toString())) > parseInt(stockPaymentInfo.buying_price.toString())) {
            throw new common_1.HttpException('Total Amount exceeds buying price', common_1.HttpStatus.BAD_REQUEST);
        }
        return this.stockPaymentRepository.update({ payment_id: id }, updateStockPaymentDto);
    }
    remove(id) {
        return `This action removes a #${id} stockPayment`;
    }
    convertPaymentsToList(payments) {
        let paymentList = [];
        payments.forEach((payment, index) => {
            let stockObj = this.convertPaymentToViewDto(payment);
            paymentList.push(stockObj);
        });
        return paymentList;
    }
    convertPaymentToViewDto(payment) {
        let nfObject = new Intl.NumberFormat('en-US');
        let sotckPaymentObj = {
            payment_id: payment.payment_id,
            amount: payment.amount,
            payment_channel: payment.payment_channel,
            payment_date: payment.payment_date,
            note: payment.note,
            created_on: payment.created_on,
            amount_formatted: nfObject.format(payment.amount) + " MMK"
        };
        return sotckPaymentObj;
    }
};
exports.StockPaymentService = StockPaymentService;
exports.StockPaymentService = StockPaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(stock_payment_entity_1.StockPayment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        utility_service_1.UtilityService,
        stock_service_1.StockService])
], StockPaymentService);
//# sourceMappingURL=stock_payment.service.js.map