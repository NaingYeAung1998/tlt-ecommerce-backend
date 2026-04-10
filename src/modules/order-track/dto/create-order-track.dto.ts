import { OrderTrackStatus } from "../entities/order-track.entity";

export class CreateOrderTrackDto {
    quantity: number;
    checked_date: Date;
    status: OrderTrackStatus;
    note?: string;
    order_item: CreateOrderTrackOrderItemDto;
    unit: CreateOrderTrackUnitDto;
}

export class CreateOrderTrackOrderItemDto {
    order_item_id: string
}
export class CreateOrderTrackUnitDto {
    unit_id: string;
}
