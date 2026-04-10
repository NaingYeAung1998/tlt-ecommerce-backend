export class OrderListDto {
    voucher_code: string;
    address: string;
    customer_relation_name: string;
    customer_name: string;
    total_amount: number;
    total_paid: number;
    created_date: Date;
    count: number;
}

export class MissingStockOrderListDto {
    order_id: string;
    product_id: string;
    order_item_id: string;
    total_item_quantity: string;
    total_stock_quantity: string;
    missing_quantity: string;
    unit_id: string;
}