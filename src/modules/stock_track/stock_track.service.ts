import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStockTrackDto } from './dto/create-stock_track.dto';
import { UpdateStockTrackDto } from './dto/update-stock_track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StockTrack, StockTrackStatus } from './entities/stock_track.entity';
import { ILike, Repository } from 'typeorm';
import { UtilityService } from 'src/core/utility/utility.service';
import { StockService } from '../stock/stock.service';
import { StockTrackInfoDto, StockTrackListDto } from './dto/stock_track-list.dto';


@Injectable()
export class StockTrackService {
  constructor(
    @InjectRepository(StockTrack)
    private stockTrackRepository: Repository<StockTrack>,
    private utilityService: UtilityService,
    private stockService: StockService
  ) { }
  async create(createStockTrackDto: CreateStockTrackDto) {
    let stockTrackInfo = await this.getStockTrackInfo(createStockTrackDto.stock.stock_id)

    if (createStockTrackDto.status == StockTrackStatus.DELIVERD) {
      if ((stockTrackInfo.total_delivered + parseInt(createStockTrackDto.quantity.toString())) > parseInt(stockTrackInfo.quantity.toString())) {
        throw new HttpException('Deliverable quantity exceeds', HttpStatus.BAD_REQUEST);
      }
    }
    if (createStockTrackDto.status == StockTrackStatus.STORED) {
      if ((stockTrackInfo.total_stored + parseInt(createStockTrackDto.quantity.toString())) > parseInt(stockTrackInfo.quantity.toString())) {
        throw new HttpException('Storeable quantity exceeds', HttpStatus.BAD_REQUEST);
      }
    }
    return this.stockTrackRepository.save(createStockTrackDto);
  }

  async findAll(search: string, currentPage: number, perPage: number) {
    if (perPage < 0) {
      return await this.stockTrackRepository.find({ order: { checked_date: 'DESC' } });
    } else {
      let [data, toatlLength] = await this.stockTrackRepository.findAndCount({
        where: [
          { note: ILike(`%${search}%`) }
        ],
        order: { created_on: 'DESC' },
        skip: currentPage * perPage,
        take: perPage
      });
      return this.utilityService.createPaginationList(data, currentPage, perPage, toatlLength)
    }

  }

  async findByStock(stock_id: string, search: string, currentPage: number, perPage: number) {
    if (perPage < 0) {
      let data = await this.stockTrackRepository.find({
        where: [{ stock: { stock_id: stock_id }, note: ILike(`%${search}%`) }],
        order: { checked_date: 'DESC' },
        relations: ['stock', 'warehouse']
      }
      );
      return this.convertStockTrackListsToViewListDto(data)
    } else {
      let [data, totalLength] = await this.stockTrackRepository.findAndCount({
        where: [
          { stock: { stock_id: stock_id }, note: ILike(`%${search}%`) }
        ],
        order: { created_on: 'DESC' },
        skip: currentPage * perPage,
        take: perPage,
        relations: ['stock', 'warehouse']
      });
      let trackViewList = this.convertStockTrackListsToViewListDto(data)
      return this.utilityService.createPaginationList(trackViewList, currentPage, perPage, totalLength)
    }

  }

  async getStockTrackInfo(stock_id: string) {
    let stockInfo: StockTrackInfoDto = await this.stockTrackRepository.createQueryBuilder("stock_track")
      .leftJoin("stock_track.stock", "stock")
      .leftJoin("stock.product", "product")
      .groupBy("stock.stock_id")
      .where("stock.stock_id = :stock_id", { stock_id })
      .select("stock.*")
      .addSelect("CONCAT(product.product_name, ' (', product.product_code, ')' )", "stock_product")
      .addSelect("SUM(CASE WHEN stock_track.status =" + StockTrackStatus.DELIVERD + " THEN stock_track.quantity ELSE 0 END)", "total_delivered")
      .addSelect("SUM(CASE WHEN stock_track.status =" + StockTrackStatus.STORED + " THEN stock_track.quantity ELSE 0 END)", "total_stored")
      .getRawOne();
    return stockInfo;
  }


  findOne(id: string) {
    return this.stockTrackRepository.findOne({ where: { track_id: id }, relations: ['warehouse'] })
  }

  async update(id: string, updateStockTrackDto: UpdateStockTrackDto) {
    let stockTrackInfo = await this.getStockTrackInfo(updateStockTrackDto.stock.stock_id)
    let trackInfo = await this.findOne(id);

    if (updateStockTrackDto.status == StockTrackStatus.DELIVERD) {
      if ((stockTrackInfo.total_delivered + parseInt(updateStockTrackDto.quantity.toString()) - parseInt(trackInfo.quantity.toString())) > parseInt(stockTrackInfo.quantity.toString())) {
        throw new HttpException('Deliverable quantity exceeds', HttpStatus.BAD_REQUEST);
      }
    }
    if (updateStockTrackDto.status == StockTrackStatus.STORED) {
      if ((stockTrackInfo.total_stored + parseInt(updateStockTrackDto.quantity.toString()) - parseInt(trackInfo.quantity.toString())) > parseInt(stockTrackInfo.quantity.toString())) {
        throw new HttpException('Storeable quantity exceeds', HttpStatus.BAD_REQUEST);
      }
    }
    return this.stockTrackRepository.update({ track_id: id }, updateStockTrackDto);
  }

  remove(id: number) {
    return `This action removes a #${id} stockTrack`;
  }

  convertStockTrackListsToViewListDto(tracks: StockTrack[]) {
    let trackList: StockTrackListDto[] = [];
    tracks.forEach((track, index) => {
      let trackObj: StockTrackListDto = this.convertStockTrackToViewDto(track);
      trackList.push(trackObj);
    })
    return trackList;
  }

  convertStockTrackToViewDto(track: StockTrack) {
    let stockTrackObj: StockTrackListDto = {
      track_id: track.track_id,
      quantity: track.quantity,
      checked_date: track.checked_date,
      status: track.status,
      created_on: track.created_on,
      note: track.note,
      warehouse_name: track.warehouse?.warehouse_name
    }
    return stockTrackObj;
  }
}
