import { Injectable } from '@nestjs/common';
import { CreateStockTrackDto } from './dto/create-stock_track.dto';
import { UpdateStockTrackDto } from './dto/update-stock_track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StockTrack } from './entities/stock_track.entity';
import { ILike, Repository } from 'typeorm';
import { UtilityService } from 'src/core/utility/utility.service';

@Injectable()
export class StockTrackService {
  constructor(
    @InjectRepository(StockTrack)
    private stockTrackRepository: Repository<StockTrack>,
    private utilityService: UtilityService
  ) { }
  create(createStockTrackDto: CreateStockTrackDto) {
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
      return await this.stockTrackRepository.find({
        where: { stock: { stock_id: stock_id, note: ILike(`%${search}%`) } },
        order: { checked_date: 'DESC' }
      }
      );
    } else {
      let [data, toatlLength] = await this.stockTrackRepository.findAndCount({
        where: [
          { stock: { stock_id: stock_id }, note: ILike(`%${search}%`) }
        ],
        order: { created_on: 'DESC' },
        skip: currentPage * perPage,
        take: perPage,
        relations: ['stock']
      });
      return this.utilityService.createPaginationList(data, currentPage, perPage, toatlLength)
    }

  }


  findOne(id: string) {
    return this.stockTrackRepository.findOne({ where: { track_id: id } })
  }

  update(id: string, updateStockTrackDto: UpdateStockTrackDto) {
    return this.stockTrackRepository.update({ track_id: id }, updateStockTrackDto);
  }

  remove(id: number) {
    return `This action removes a #${id} stockTrack`;
  }
}
