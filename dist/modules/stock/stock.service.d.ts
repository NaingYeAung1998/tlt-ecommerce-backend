import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Repository } from 'typeorm';
import { Stock } from './entities/stock.entity';
import { UtilityService } from 'src/core/utility/utility.service';
import { StockListDto } from './dto/stock-list.dto';
export declare class StockService {
    private stockRepository;
    private utilityService;
    constructor(stockRepository: Repository<Stock>, utilityService: UtilityService);
    create(createStockDto: CreateStockDto): Promise<CreateStockDto & Stock>;
    findAll(search: string, currentPage: number, perPage: number): Promise<import("../../core/utility/dto/pagination-list.dto").PaginationList>;
    findByProduct(product_id: string, search: string, currentPage: number, perPage: number): Promise<import("../../core/utility/dto/pagination-list.dto").PaginationList>;
    findOne(id: string): Promise<StockListDto>;
    update(id: string, updateStockDto: UpdateStockDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): string;
    private convertStocksToList;
    private convertStockToViewDto;
}
