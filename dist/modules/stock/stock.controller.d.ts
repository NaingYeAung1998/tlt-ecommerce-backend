import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
export declare class StockController {
    private readonly stockService;
    constructor(stockService: StockService);
    create(createStockDto: CreateStockDto): Promise<CreateStockDto & import("./entities/stock.entity").Stock>;
    findAll(query: {
        search: string;
        currentPage: number;
        perPage: number;
    }): Promise<import("../../core/utility/dto/pagination-list.dto").PaginationList>;
    findByProduct(query: {
        product_id: string;
        search: string;
        currentPage: number;
        perPage: number;
    }): Promise<import("../../core/utility/dto/pagination-list.dto").PaginationList>;
    findBySupplier(query: {
        supplier_id: string;
        search: string;
    }): Promise<import("./dto/stock-list.dto").StockListDto[]>;
    findOne(id: string): Promise<import("./dto/stock-list.dto").StockListDto>;
    update(id: string, updateStockDto: UpdateStockDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): string;
}
