import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupplierModule } from './modules/supplier/supplier.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilityModule } from './core/utility/utility.module';
import { Supplier } from './modules/supplier/entities/supplier.entity';
import { CategoryModule } from './modules/category/category.module';
import { GradeModule } from './modules/grade/grade.module';
import { Category } from './modules/category/entities/category.entity';
import { Grade } from './modules/grade/entities/grade.entity';
import { UnitModule } from './modules/unit/unit.module';
import { ProductModule } from './modules/product/product.module';
import { Unit } from './modules/unit/entities/unit.entity';
import { Product } from './modules/product/entities/product.entity';
import { StockModule } from './modules/stock/stock.module';
import { Stock } from './modules/stock/entities/stock.entity';
import { WarehouseModule } from './modules/warehouse/warehouse.module';
import { StockPaymentModule } from './modules/stock_payment/stock_payment.module';
import { StockTrackModule } from './modules/stock_track/stock_track.module';
import { StockPayment } from './modules/stock_payment/entities/stock_payment.entity';
import { StockTrack } from './modules/stock_track/entities/stock_track.entity';
import { Warehouse } from './modules/warehouse/entities/warehouse.entity';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      synchronize: process.env.DB_SYNC == 'true',
      autoLoadEntities: true,
      entities: [Supplier, Category, Grade, Unit, Product, Stock, StockPayment, StockTrack, Warehouse],
      logger: 'file',
      logging: ["error"]
    }),
    SupplierModule, UtilityModule, CategoryModule, GradeModule, UnitModule, ProductModule, StockModule, WarehouseModule, StockPaymentModule, StockTrackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
