import { Injectable } from '@nestjs/common';
import { CreateStockPaymentDto } from './dto/create-stock_payment.dto';
import { UpdateStockPaymentDto } from './dto/update-stock_payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StockPayment } from './entities/stock_payment.entity';
import { ILike, Repository } from 'typeorm';
import { UtilityService } from 'src/core/utility/utility.service';

@Injectable()
export class StockPaymentService {
  constructor(
    @InjectRepository(StockPayment)
    private stockPaymentRepository: Repository<StockPayment>,
    private utilityService: UtilityService
  ) { }
  create(createStockPaymentDto: CreateStockPaymentDto) {
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
      return await this.stockPaymentRepository.find({
        where: { stock: { stock_id: stock_id, note: ILike(`%${search}%`) } },
        order: { payment_date: 'DESC' }
      }
      );
    } else {
      let [data, toatlLength] = await this.stockPaymentRepository.findAndCount({
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

  findOne(id: number) {
    return `This action returns a #${id} stockPayment`;
  }

  update(id: number, updateStockPaymentDto: UpdateStockPaymentDto) {
    return `This action updates a #${id} stockPayment`;
  }

  remove(id: number) {
    return `This action removes a #${id} stockPayment`;
  }
}
