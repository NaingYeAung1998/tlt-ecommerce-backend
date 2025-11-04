import { CreateStockTrackDto } from './dto/create-stock_track.dto';
import { UpdateStockTrackDto } from './dto/update-stock_track.dto';
import { StockTrack } from './entities/stock_track.entity';
import { Repository } from 'typeorm';
import { UtilityService } from 'src/core/utility/utility.service';
import { StockService } from '../stock/stock.service';
import { StockTrackInfoDto, StockTrackListDto } from './dto/stock_track-list.dto';
export declare class StockTrackService {
    private stockTrackRepository;
    private utilityService;
    private stockService;
    constructor(stockTrackRepository: Repository<StockTrack>, utilityService: UtilityService, stockService: StockService);
    create(createStockTrackDto: CreateStockTrackDto): Promise<CreateStockTrackDto & StockTrack>;
    findAll(search: string, currentPage: number, perPage: number): Promise<import("../../core/utility/dto/pagination-list.dto").PaginationList | StockTrack[]>;
    findByStock(stock_id: string, search: string, currentPage: number, perPage: number): Promise<import("../../core/utility/dto/pagination-list.dto").PaginationList | StockTrackListDto[]>;
    getStockTrackInfo(stock_id: string): Promise<StockTrackInfoDto>;
    findOne(id: string): Promise<StockTrack>;
    update(id: string, updateStockTrackDto: UpdateStockTrackDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): string;
    convertStockTrackListsToViewListDto(tracks: StockTrack[]): StockTrackListDto[];
    convertStockTrackToViewDto(track: StockTrack): StockTrackListDto;
}
