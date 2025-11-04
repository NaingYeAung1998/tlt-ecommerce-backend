import { CreateStockPaymentDto } from './dto/create-stock_payment.dto';
import { UpdateStockPaymentDto } from './dto/update-stock_payment.dto';
import { StockPayment } from './entities/stock_payment.entity';
import { Repository } from 'typeorm';
import { UtilityService } from 'src/core/utility/utility.service';
import { StockService } from '../stock/stock.service';
import { StockPaymentInfoDto, StockPaymentListDto } from './dto/stock_payment-list.dto';
export declare class StockPaymentService {
    private stockPaymentRepository;
    private utilityService;
    private stockService;
    constructor(stockPaymentRepository: Repository<StockPayment>, utilityService: UtilityService, stockService: StockService);
    create(createStockPaymentDto: CreateStockPaymentDto): Promise<CreateStockPaymentDto & StockPayment>;
    findAll(search: string, currentPage: number, perPage: number): Promise<import("../../core/utility/dto/pagination-list.dto").PaginationList | StockPayment[]>;
    findByStock(stock_id: string, search: string, currentPage: number, perPage: number): Promise<import("../../core/utility/dto/pagination-list.dto").PaginationList | StockPaymentListDto[]>;
    getStockPaymentInfo(stock_id: string): Promise<StockPaymentInfoDto>;
    findOne(id: string): Promise<StockPayment>;
    update(id: string, updateStockPaymentDto: UpdateStockPaymentDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): string;
    private convertPaymentsToList;
    private convertPaymentToViewDto;
}
