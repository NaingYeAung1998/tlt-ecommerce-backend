import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Stock } from './entities/stock.entity';
import { UtilityService } from 'src/core/utility/utility.service';
import { StockListDto } from './dto/stock-list.dto';
import { PRODUCT_STOCK_INITIALS } from 'src/core/constants';
import { StockTrackStatus } from '../stock_track/entities/stock_track.entity';
import { StockTrackInfoDto, StockTrackListDto } from '../stock_track/dto/stock_track-list.dto';
import { StockTrackService } from '../stock_track/stock_track.service';
import { OrderService } from '../order/order.service';
import { CreateStockTrackDto } from '../stock_track/dto/create-stock_track.dto';
import { ProductService } from '../product/product.service';
import { CreateOrderItemStockDto } from '../order_items/dto/create-order_item.dto';
import { OrderItemsService } from '../order_items/order_items.service';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
    private utilityService: UtilityService,
    @Inject(forwardRef(() => StockTrackService))
    private stockTrackService: StockTrackService,
    @Inject(forwardRef(() => OrderService))
    private orderService: OrderService,
    private productService: ProductService,
    private orderItemsService: OrderItemsService
  ) { }
  async create(createStockDto: CreateStockDto) {
    try {
      let stockCount = await this.stockRepository.count();
      createStockDto.stock_code = this.utilityService.formatAutoIncrementCode(PRODUCT_STOCK_INITIALS, stockCount)
      let stock = await this.stockRepository.save(createStockDto);
      if (createStockDto.stock_tracks && createStockDto.stock_tracks.length > 0) {
        let createStockTracks: CreateStockTrackDto[] = [];
        createStockDto.stock_tracks.map((track, index) => {
          let createStockTrack = new CreateStockTrackDto();
          createStockTrack.checked_date = track.checked_date;
          createStockTrack.quantity = track.quantity;
          createStockTrack.status = track.status;
          createStockTrack.stock = { stock_id: stock.stock_id };
          createStockTrack.unit = track.unit;
          createStockTracks.push(createStockTrack);
        })
        await this.fillOrderMissingStocks(createStockDto, createStockTracks);
      }
      return createStockDto;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(search: string, currentPage: number, perPage: number, productId?: string, supplierId?: string, onlyAvailable?: boolean, sortOrder: 'DESC' | 'ASC' = 'DESC') {
    let stockCount = await this.stockRepository.createQueryBuilder("stock")
      .leftJoin("stock.stock_tracks", "stock_track")
      .leftJoin("stock.product", "product")
      .groupBy("stock.stock_id")
      .select("stock.*")
      .getCount();

    let stocks: StockTrackInfoDto[] = await this.stockRepository.createQueryBuilder("stock")
      .leftJoin("stock.stock_tracks", "stock_track")
      .leftJoin("stock.product", "product")
      .leftJoin("stock.supplier", "supplier")
      .leftJoin("stock.unit", "unit")
      .leftJoin("product.per_bag_unit", "per_bag_unit")
      .groupBy("stock.stock_id")
      .select("stock.*")
      .addSelect("product.*")
      .addSelect("CONCAT(product.product_name, ' (', product.product_code, ')' )", "stock_product")
      .addSelect("product.product_id", "stock_product_id")
      .addSelect("CONCAT(supplier.supplier_name, ' (', COALESCE(supplier.supplier_phone, ''), ')' )", "stock_supplier")
      .addSelect("supplier.supplier_id", "stock_supplier_id")
      .addSelect("unit.unit_id", "stock_unit_id")
      .addSelect("unit.unit_name", "stock_unit")
      .addSelect("per_bag_unit.unit_id", "stock_product_per_bag_unit_id")
      .addSelect("product.quantity_per_bag", "stock_product_per_bag_quantity")
      .addSelect("SUM(CASE WHEN stock_track.status =" + StockTrackStatus.DELIVERD + " THEN stock_track.quantity ELSE 0 END)", "total_delivered")
      .addSelect("SUM(CASE WHEN stock_track.status =" + StockTrackStatus.STORED + " THEN stock_track.quantity ELSE 0 END)", "total_stored")
      .addSelect("SUM(CASE WHEN stock_track.status =" + StockTrackStatus.RECEIVED + " THEN stock_track.quantity ELSE 0 END)", "total_received")
      .addSelect("SUM(CASE WHEN stock_track.status =" + StockTrackStatus.TRANSFERRED + " THEN stock_track.quantity ELSE 0 END)", "total_transferred")
      .addSelect("SUM(CASE WHEN stock_track.status =" + StockTrackStatus.SOLD + " THEN stock_track.quantity ELSE 0 END)", "total_sold")
      .where(productId != null ? ("product.product_id = '" + productId + "'") : ("1 = 1"))
      .andWhere(supplierId != null ? ("supplier.supplier_id = '" + supplierId + "'") : ("1 = 1"))
      .andHaving(onlyAvailable ? ("(total_stored + total_received) > (total_transferred + total_sold)") : ("1 = 1"))
      .orderBy("stock.created_on", sortOrder)
      .skip(currentPage * perPage)
      .take(perPage < 0 ? stockCount : perPage)
      .getRawMany();
    return perPage < 0 ? stocks : this.utilityService.createPaginationList(stocks, currentPage, perPage, stockCount)
  }

  async findByProduct(product_id: string, search: string, currentPage: number, perPage: number) {
    return this.findAll(search, currentPage, perPage, product_id)
  }

  async findBySuppleir(supplier_id: string, search: string) {
    return this.findAll(search, 0, -1, null, supplier_id)
  }

  async findOne(id: string) {
    let stock = await this.stockRepository.findOne({ where: { stock_id: id }, relations: ['product', 'supplier', 'unit', 'warehouse', 'stock_tracks', 'product.grade'] });
    if (!stock) {
      throw new HttpException('Stock not found', HttpStatus.NOT_FOUND)
    }
    return stock;
  }

  async update(id: string, updateStockDto: UpdateStockDto) {
    updateStockDto.stock_tracks = undefined;
    return this.stockRepository.update({ stock_id: id }, updateStockDto)
  }

  remove(id: number) {
    return `This action removes a #${id} stock`;
  }

  async fillOrderMissingStocks(createStockDto: CreateStockDto, createStockTracks: CreateStockTrackDto[]) {
    const missingStockPromises = createStockTracks.map(async (track, index) => {
      if (track.status == StockTrackStatus.STORED && track.quantity > 0) {
        let trackRemainingQuantity = track.quantity;
        let missingStockOrders = await this.orderService.getMissingStockOrders(createStockDto.product.product_id);
        let productMissingFillUpQuantity = 0;
        let stockTracks: CreateStockTrackDto[] = [];
        let orderItemStocks: CreateOrderItemStockDto[] = [];
        for (let i = 0; i < missingStockOrders.length; i++) {
          let missingStock = missingStockOrders[i];
          let missingStockQunatity = parseFloat(missingStock.missing_quantity)
          let createStockTrackQuantity = 0
          if (missingStockQunatity > trackRemainingQuantity) {
            missingStockQunatity = missingStockQunatity - trackRemainingQuantity;
            createStockTrackQuantity = trackRemainingQuantity;
            trackRemainingQuantity = 0;
          } else {
            trackRemainingQuantity = missingStockQunatity - trackRemainingQuantity;
            createStockTrackQuantity = missingStockQunatity;
            missingStockQunatity = 0;
          }
          productMissingFillUpQuantity += createStockTrackQuantity;
          let stockTrack = new CreateStockTrackDto();
          stockTrack.checked_date = new Date();
          stockTrack.quantity = createStockTrackQuantity;
          stockTrack.unit = track.unit;
          stockTrack.stock = track.stock;
          stockTrack.warehouse = { warehouse_id: process.env.MAIN_WAREHOUSE_ID };
          stockTrack.status = StockTrackStatus.SOLD;
          stockTracks.push(stockTrack);
          let orderItemStock = new CreateOrderItemStockDto();
          orderItemStock.order_item = { order_item_id: missingStock.order_item_id };
          orderItemStock.stock = track.stock;
          orderItemStock.unit = track.unit;
          orderItemStock.quantity = createStockTrackQuantity;
          orderItemStocks.push(orderItemStock);
          await this.orderItemsService.updateMissingQuantity(missingStock.order_item_id, createStockTrackQuantity);
          if (trackRemainingQuantity <= 0) {
            break;
          }
        }
        // await this.productService.updateMissingQuantity(createStockDto.product.product_id, productMissingFillUpQuantity)
        await this.stockTrackService.createBatch(stockTracks);
        await this.orderItemsService.createOrderItemStockBatch(orderItemStocks)
      }
    })
    await Promise.all(missingStockPromises);
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
      stock_product_per_bag_unit_id: stock.product?.per_bag_unit?.unit_id,
      stock_product_per_bag_quantity: stock.product?.quantity_per_bag,
      quantity: stock.quantity,
      buying_price: stock.buying_price,
      selling_price: stock.product?.selling_price,
      fix_price: stock.product?.fix_price,
      wholesale_selling_price: stock.product?.wholesale_selling_price,
      wholesale_fix_price: stock.product?.wholesale_fix_price,
      wholesale_starting_quantity: stock.product?.wholesale_starting_quantity,
      wholesale_starting_unit: stock.product?.wholesale_starting_unit?.unit_name,
      wholesale_strating_unit_id: stock.product?.wholesale_starting_unit?.unit_id,
      buying_price_formatted: nfObject.format(stock.buying_price) + " MMK",
      selling_price_formatted: nfObject.format(stock.product?.selling_price) + " MMK",
      fix_price_formatted: nfObject.format(stock.product?.fix_price) + " MMMK",
      note: stock.note,
      created_on: stock.created_on
    }
    return stockObj;
  }

}
