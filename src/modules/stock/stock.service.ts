import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Stock } from './entities/stock.entity';
import { UtilityService } from 'src/core/utility/utility.service';
import { StockListDto } from './dto/stock-list.dto';
import { PRODUCT_STOCK_INITIALS } from 'src/core/constants';
import { StockTrackStatus } from '../stock_track/entities/stock_track.entity';
import { StockTrackInfoDto } from '../stock_track/dto/stock_track-list.dto';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
    private utilityService: UtilityService
  ) { }
  async create(createStockDto: CreateStockDto) {
    try {
      let stockCount = await this.stockRepository.count();
      createStockDto.stock_code = this.utilityService.formatAutoIncrementCode(PRODUCT_STOCK_INITIALS, stockCount)
      return this.stockRepository.save(createStockDto);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(search: string, currentPage: number, perPage: number) {
    let [data, toatlLength] = await this.stockRepository.findAndCount({
      where: [
        { stock_code: ILike(`%${search}%`) }
      ],
      order: { created_on: 'DESC' },
      skip: currentPage * perPage,
      take: perPage,
      relations: ['product', 'supplier', 'unit']
    });
    let stockList: StockListDto[] = this.convertStocksToList(data);
    return this.utilityService.createPaginationList(stockList, currentPage, perPage, toatlLength)
  }

  async findByProduct(product_id: string, search: string, currentPage: number, perPage: number) {
    if (perPage == -1) {
      let data = await this.stockRepository.find({
        where: [
          { product: { product_id: product_id } }
        ],
        order: { created_on: 'DESC' },
        relations: ['product', 'supplier', 'unit']
      });
      let stockList: StockListDto[] = this.convertStocksToList(data);
      return stockList;
    } else {
      let [data, totalLength] = await this.stockRepository.findAndCount({
        where: [
          { product: { product_id: product_id }, stock_code: ILike(`%${search}%`) }
        ],
        order: { created_on: 'DESC' },
        skip: currentPage * perPage,
        take: perPage,
        relations: ['product', 'supplier', 'unit']
      });
      let stockList: StockListDto[] = this.convertStocksToList(data);
      return this.utilityService.createPaginationList(stockList, currentPage, perPage, totalLength)
    }

  }

  async findBySuppleir(supplier_id: string, search: string) {
    let [data, totalLength] = await this.stockRepository.createQueryBuilder("stock")
      .leftJoinAndSelect("stock.product", "product")
      .leftJoinAndSelect("stock.unit", "unit")
      .where("stock.is_delete = :is_delete AND stock.supplier_id = :supplier_id ", { is_delete: false, supplier_id })
      .andWhere((query) => {
        const subQuery = query.subQuery().select("supplier_voucher_stock.stock_id").from("supplier_voucher_stock", "supplier_voucher_stock").getQuery();
        return `stock.stock_id NOT IN ${subQuery}`
      })
      .getManyAndCount();

    let stockList: StockListDto[] = this.convertStocksToList(data);
    return stockList;
  }

  async getStockTrackInfo(stock_id: string) {
    let stockInfo: StockTrackInfoDto = await this.stockRepository.createQueryBuilder("stock")
      .leftJoin("stock.stock_tracks", "stock_track")
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

  async findOne(id: string) {
    let stock = await this.stockRepository.findOne({ where: { stock_id: id }, relations: ['product', 'supplier', 'unit', 'wholesale_starting_unit', 'warehouse'] });
    if (!stock) {
      throw new HttpException('Stock not found', HttpStatus.NOT_FOUND)
    }
    return this.convertStockToViewDto(stock);
  }

  update(id: string, updateStockDto: UpdateStockDto) {
    console.log(updateStockDto)
    return this.stockRepository.update({ stock_id: id }, updateStockDto)
  }

  remove(id: number) {
    return `This action removes a #${id} stock`;
  }

  private convertStocksToList(stocks: Stock[]): StockListDto[] {
    let stockList: StockListDto[] = [];
    stocks.forEach((stock, index) => {
      let stockObj: StockListDto = this.convertStockToViewDto(stock);
      stockList.push(stockObj);
    })
    return stockList;
  }

  private convertStockToViewDto(stock: Stock): StockListDto {
    let nfObject = new Intl.NumberFormat('en-US');
    let stockObj: StockListDto = {
      stock_id: stock.stock_id,
      stock_code: stock.stock_code,
      stock_product: stock.product?.product_name + " (" + stock.product?.product_code + ")",
      stock_product_id: stock.product?.product_id,
      stock_supplier: stock.supplier?.supplier_name + " (" + stock.supplier?.supplier_phone + ")",
      stock_supplier_id: stock.supplier?.supplier_id,
      stock_warehouse: stock.warehouse?.warehouse_name,
      stock_warehouse_id: stock.warehouse?.warehouse_id,
      stock_unit: stock.unit.unit_name,
      stock_unit_id: stock.unit?.unit_id,
      quantity: stock.quantity,
      buying_price: stock.buying_price,
      selling_price: stock.selling_price,
      fix_price: stock.fix_price,
      wholesale_selling_price: stock.wholesale_selling_price,
      wholesale_fix_price: stock.wholesale_fix_price,
      wholesale_starting_quantity: stock.wholesale_starting_quantity,
      wholesale_starting_unit: stock.wholesale_starting_unit?.unit_name,
      wholesale_strating_unit_id: stock.wholesale_starting_unit?.unit_id,
      buying_price_formatted: nfObject.format(stock.buying_price) + " MMK",
      selling_price_formatted: nfObject.format(stock.selling_price) + " MMK",
      fix_price_formatted: nfObject.format(stock.fix_price) + " MMMK",
      note: stock.note,
      created_on: stock.created_on
    }
    return stockObj;
  }

}
