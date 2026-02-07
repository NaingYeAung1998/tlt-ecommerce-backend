import { OrderItem } from "src/modules/order_items/entities/order_item.entity";
import { OrderPayment } from "src/modules/order_payments/entities/order_payment.entity";

export class CreateOrderDto {
    voucher_code?: string;
    order_date: Date;
    customer_name?: string;
    address?: string;
    note?: string;
    customer?: CreateOrderCustomerDto;
    items: OrderItem[];
    payments: OrderPayment[]
}

export class CreateOrderCustomerDto {
    customer_id: string;
}
