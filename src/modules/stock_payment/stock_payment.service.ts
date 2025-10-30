import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStockPaymentDto } from './dto/create-stock_payment.dto';
import { UpdateStockPaymentDto } from './dto/update-stock_payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StockPayment } from './entities/stock_payment.entity';
import { ILike, Repository } from 'typeorm';
import { UtilityService } from 'src/core/utility/utility.service';
import { StockService } from '../stock/stock.service';
import { StockPaymentInfoDto, StockPaymentListDto } from './dto/stock_payment-list.dto';

@Injectable()
export class StockPaymentService {
  constructor(
    @InjectRepository(StockPayment)
    private stockPaymentRepository: Repository<StockPayment>,
    private utilityService: UtilityService,
    private stockService: StockService
  ) { }
  async create(createStockPaymentDto: CreateStockPaymentDto) {
    const stockPaymentInfo = await this.getStockPaymentInfo(createStockPaymentDto.stock.stock_id);
    if ((stockPaymentInfo.total_paid + parseInt(createStockPaymentDto.amount.toString())) > parseInt(stockPaymentInfo.buying_price.toString())) {
      throw new HttpException('Total Amount exceeds buying price', HttpStatus.BAD_REQUEST);
    }
    return this.stockPaymentRepository.save(createStockPaymentDto);
  }

  async findAll(search: string, currentPage: number, perPage: number) {
    if (perPage < 0) {
      return await this.stockPaymentRepository.find({ order: { payment_date: 'DESC' } });
    } else {
      let [data, toatlLength] = await this.stockPaymentRepository.findAndCount({
        where: [
          { note: ILike(`%${search}%`) },
          { payment_channel: ILike(`%${search}%`) }
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
      let data = await this.stockPaymentRepository.find({
        where: [{ stock: { stock_id: stock_id } }, { note: ILike(`%${search}%`) }],
        order: { payment_date: 'DESC' }
      }
      );
      let paymentList = this.convertPaymentsToList(data)
      return paymentList;
    } else {
      let [data, toatlLength] = await this.stockPaymentRepository.findAndCount({
        where: [{ stock: { stock_id: stock_id } }, { note: ILike(`%${search}%`) }],
        order: { created_on: 'DESC' },
        skip: currentPage * perPage,
        take: perPage,
        relations: ['stock']
      });
      let paymentList = this.convertPaymentsToList(data)
      return this.utilityService.createPaginationList(paymentList, currentPage, perPage, toatlLength)
    }
  }

  async getStockPaymentInfo(stock_id: string) {
    let stockInfo: StockPaymentInfoDto = await this.stockService.findOne(stock_id);
    //change to query builder later
    let stockPayments = await this.stockPaymentRepository.find({ where: { stock: { stock_id: stock_id } }, relations: ['stock'] });
    stockInfo.total_paid = 0;
    stockPayments.forEach((payment) => {
      stockInfo.total_paid += parseInt(payment.amount.toString());
    })
    let nfObject = new Intl.NumberFormat('en-US');
    stockInfo.total_paid_formatted = nfObject.format(stockInfo.total_paid) + " MMK";

    return stockInfo;
  }

  findOne(id: string) {
    return this.stockPaymentRepository.findOne({ where: { payment_id: id } });
  }

  async update(id: string, updateStockPaymentDto: UpdateStockPaymentDto) {
    let stockPaymentInfo = await this.getStockPaymentInfo(updateStockPaymentDto.stock.stock_id);
    let paymentInfo = await this.findOne(id);
    if ((stockPaymentInfo.total_paid + parseInt(updateStockPaymentDto.amount.toString()) - parseInt(paymentInfo.amount.toString())) > parseInt(stockPaymentInfo.buying_price.toString())) {
      throw new HttpException('Total Amount exceeds buying price', HttpStatus.BAD_REQUEST);
    }
    return this.stockPaymentRepository.update({ payment_id: id }, updateStockPaymentDto);
  }

  remove(id: number) {
    return `This action removes a #${id} stockPayment`;
  }

  private convertPaymentsToList(payments: StockPayment[]) {
    let paymentList: StockPaymentListDto[] = [];
    payments.forEach((payment, index) => {
      let stockObj: StockPaymentListDto = this.convertPaymentToViewDto(payment);
      paymentList.push(stockObj);
    })
    return paymentList;
  }

  private convertPaymentToViewDto(payment: StockPayment) {
    let nfObject = new Intl.NumberFormat('en-US');
    let sotckPaymentObj: StockPaymentListDto = {
      payment_id: payment.payment_id,
      amount: payment.amount,
      payment_channel: payment.payment_channel,
      payment_date: payment.payment_date,
      note: payment.note,
      created_on: payment.created_on,
      amount_formatted: nfObject.format(payment.amount) + " MMK"
    }

    return sotckPaymentObj;
  }
}
