import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Stock } from './entities/stock.entity';
import { UtilityService } from 'src/core/utility/utility.service';
import { StockListDto } from './dto/stock-list.dto';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
    private utilityService: UtilityService
  ) { }
  async create(createStockDto: CreateStockDto) {
    try {
      let existingProduct = await this.stockRepository.findOne({ where: { stock_code: createStockDto.stock_code } });
      if (existingProduct) {
        throw new HttpException('Duplicate Stock Code', HttpStatus.BAD_REQUEST)
      }
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
    let [data, toatlLength] = await this.stockRepository.findAndCount({
      where: [
        { product: { product_id: product_id }, stock_code: ILike(`%${search}%`) }
      ],
      order: { created_on: 'DESC' },
      skip: currentPage * perPage,
      take: perPage,
      relations: ['product', 'supplier', 'unit']
    });
    let stockList: StockListDto[] = this.convertStocksToList(data);
    return this.utilityService.createPaginationList(stockList, currentPage, perPage, toatlLength)
  }

  async findOne(id: string) {
    let stock = await this.stockRepository.findOne({ where: { stock_id: id }, relations: ['product', 'supplier', 'unit'] });
    if (!stock) {
      throw new HttpException('Stock not found', HttpStatus.NOT_FOUND)
    }
    return this.convertStockToViewDto(stock);
  }

  update(id: string, updateStockDto: UpdateStockDto) {
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
      stock_product: stock.product.product_name + "(" + stock.product.product_code + ")",
      stock_supplier: stock.supplier.supplier_name + "(" + stock.supplier.supplier_phone + ")",
      stock_unit: stock.unit.unit_symbol,
      quantity: stock.quantity,
      buying_price: stock.buying_price,
      selling_price: stock.selling_price,
      fix_price: stock.fix_price,
      buying_price_formatted: nfObject.format(stock.buying_price) + " MMK",
      selling_price_formatted: nfObject.format(stock.selling_price) + " MMK",
      fix_price_formatted: nfObject.format(stock.fix_price) + " MMMK",
      note: stock.note,
      created_on: stock.created_on
    }
    return stockObj;
  }

}
