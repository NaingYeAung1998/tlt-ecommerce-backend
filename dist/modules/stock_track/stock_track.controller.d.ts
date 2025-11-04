import { StockTrackService } from './stock_track.service';
import { CreateStockTrackDto } from './dto/create-stock_track.dto';
import { UpdateStockTrackDto } from './dto/update-stock_track.dto';
export declare class StockTrackController {
    private readonly stockTrackService;
    constructor(stockTrackService: StockTrackService);
    create(createStockTrackDto: CreateStockTrackDto): Promise<CreateStockTrackDto & import("./entities/stock_track.entity").StockTrack>;
    findAll(query: {
        search: string;
        currentPage: number;
        perPage: number;
    }): Promise<import("../../core/utility/dto/pagination-list.dto").PaginationList | import("./entities/stock_track.entity").StockTrack[]>;
    findByProduct(query: {
        stock_id: string;
        search: string;
        currentPage: number;
        perPage: number;
    }): Promise<import("../../core/utility/dto/pagination-list.dto").PaginationList | import("./dto/stock_track-list.dto").StockTrackListDto[]>;
    findOne(id: string): Promise<import("./entities/stock_track.entity").StockTrack>;
    findInfo(id: string): Promise<import("./dto/stock_track-list.dto").StockTrackInfoDto>;
    update(id: string, updateStockTrackDto: UpdateStockTrackDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): string;
}
