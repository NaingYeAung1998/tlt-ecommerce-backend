export class CreateOrderItemDto {

}

export class CreateOrderItemStockDto {
    order_item: CreateOrderItemStockItemDto
    stock: CreateOrderItemStockStockDto
    quantity: number
    unit: CreateOrderItemStockUnitDto
}

export class CreateOrderItemStockItemDto {
    order_item_id: string
}

export class CreateOrderItemStockStockDto {
    stock_id: string
}

export class CreateOrderItemStockUnitDto {
    unit_id: string
}