import { StockPaymentService } from './stock_payment.service';
import { CreateStockPaymentDto } from './dto/create-stock_payment.dto';
import { UpdateStockPaymentDto } from './dto/update-stock_payment.dto';
export declare class StockPaymentController {
    private readonly stockPaymentService;
    constructor(stockPaymentService: StockPaymentService);
    create(createStockPaymentDto: CreateStockPaymentDto): Promise<CreateStockPaymentDto & import("./entities/stock_payment.entity").StockPayment>;
    findAll(query: {
        search: string;
        currentPage: number;
        perPage: number;
    }): Promise<import("../../core/utility/dto/pagination-list.dto").PaginationList | import("./entities/stock_payment.entity").StockPayment[]>;
    findByProduct(query: {
        stock_id: string;
        search: string;
        currentPage: number;
        perPage: number;
    }): Promise<import("../../core/utility/dto/pagination-list.dto").PaginationList | import("./dto/stock_payment-list.dto").StockPaymentListDto[]>;
    findOne(id: string): Promise<import("./entities/stock_payment.entity").StockPayment>;
    findInfo(id: string): Promise<import("./dto/stock_payment-list.dto").StockPaymentInfoDto>;
    update(id: string, updateStockPaymentDto: UpdateStockPaymentDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): string;
}
