"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const supplier_module_1 = require("./modules/supplier/supplier.module");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const utility_module_1 = require("./core/utility/utility.module");
const supplier_entity_1 = require("./modules/supplier/entities/supplier.entity");
const category_module_1 = require("./modules/category/category.module");
const grade_module_1 = require("./modules/grade/grade.module");
const category_entity_1 = require("./modules/category/entities/category.entity");
const grade_entity_1 = require("./modules/grade/entities/grade.entity");
const unit_module_1 = require("./modules/unit/unit.module");
const product_module_1 = require("./modules/product/product.module");
const unit_entity_1 = require("./modules/unit/entities/unit.entity");
const product_entity_1 = require("./modules/product/entities/product.entity");
const stock_module_1 = require("./modules/stock/stock.module");
const stock_entity_1 = require("./modules/stock/entities/stock.entity");
const warehouse_module_1 = require("./modules/warehouse/warehouse.module");
const stock_payment_module_1 = require("./modules/stock_payment/stock_payment.module");
const stock_track_module_1 = require("./modules/stock_track/stock_track.module");
const stock_payment_entity_1 = require("./modules/stock_payment/entities/stock_payment.entity");
const stock_track_entity_1 = require("./modules/stock_track/entities/stock_track.entity");
const warehouse_entity_1 = require("./modules/warehouse/entities/warehouse.entity");
const customer_module_1 = require("./modules/customer/customer.module");
const customer_entity_1 = require("./modules/customer/entities/customer.entity");
const order_module_1 = require("./modules/order/order.module");
const supplier_voucher_module_1 = require("./supplier_voucher/supplier_voucher.module");
const supplier_voucher_stocks_module_1 = require("./modules/supplier_voucher_stocks/supplier_voucher_stocks.module");
const supplier_voucher_payments_module_1 = require("./modules/supplier_voucher_payments/supplier_voucher_payments.module");
const supplier_voucher_entity_1 = require("./supplier_voucher/entities/supplier_voucher.entity");
const supplier_voucher_stock_entity_1 = require("./modules/supplier_voucher_stocks/entities/supplier_voucher_stock.entity");
const supplier_voucher_payment_entity_1 = require("./modules/supplier_voucher_payments/entities/supplier_voucher_payment.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DATABASE,
                synchronize: process.env.DB_SYNC == 'true',
                autoLoadEntities: true,
                entities: [supplier_entity_1.Supplier, category_entity_1.Category, grade_entity_1.Grade, unit_entity_1.Unit, product_entity_1.Product, stock_entity_1.Stock, stock_payment_entity_1.StockPayment, stock_track_entity_1.StockTrack, warehouse_entity_1.Warehouse, customer_entity_1.Customer, supplier_voucher_entity_1.SupplierVoucher, supplier_voucher_stock_entity_1.SupplierVoucherStock, supplier_voucher_payment_entity_1.SupplierVoucherPayment],
                logger: 'file',
                logging: ["error"]
            }),
            supplier_module_1.SupplierModule, utility_module_1.UtilityModule, category_module_1.CategoryModule, grade_module_1.GradeModule, unit_module_1.UnitModule, product_module_1.ProductModule, stock_module_1.StockModule, warehouse_module_1.WarehouseModule, stock_payment_module_1.StockPaymentModule, stock_track_module_1.StockTrackModule, customer_module_1.CustomerModule, order_module_1.OrderModule, supplier_voucher_module_1.SupplierVoucherModule, supplier_voucher_stocks_module_1.SupplierVoucherStocksModule, supplier_voucher_payments_module_1.SupplierVoucherPaymentsModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map