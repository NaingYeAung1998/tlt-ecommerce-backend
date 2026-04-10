import { OrderTrack } from "src/modules/order-track/entities/order-track.entity";
import { Order } from "src/modules/order/entities/order.entity";
import { Product } from "src/modules/product/entities/product.entity";
import { Stock } from "src/modules/stock/entities/stock.entity";
import { Unit } from "src/modules/unit/entities/unit.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'order_item' })
export class OrderItem {
    @PrimaryColumn({ generated: 'uuid' })
    order_item_id: string;

    @Column({ type: 'decimal', scale: 2, precision: 18 })
    quantity: number;

    @Column({ type: 'decimal', scale: 2, precision: 18 })
    missing_quantity: number;

    @Column({ type: 'decimal', scale: 2, precision: 18 })
    selling_price: number;

    //Foreign Keys
    @ManyToOne(() => Order)
    @JoinColumn({ name: 'order_id' })
    order: Order;

    //Foreign Keys
    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @ManyToOne(() => Unit)
    @JoinColumn({ name: 'unit_id' })
    unit: Unit;

    @OneToMany(() => OrderItemStock, order_item_stock => order_item_stock.order_item)
    itemStocks: OrderItemStock[];

    @OneToMany(() => OrderTrack, order_track => order_track.order_item)
    itemTracks: OrderTrack[];

    @Column({ default: false, type: 'boolean', nullable: true })
    is_delete?: boolean

    @Column({ type: 'int' })
    sortOrder: number

    @CreateDateColumn()
    created_on: Date;

    @UpdateDateColumn()
    updated_on: Date;

    @DeleteDateColumn()
    deleted_on: Date;
}


@Entity({ name: 'order_item_stock' })
export class OrderItemStock {
    @PrimaryColumn({ generated: 'uuid' })
    order_item_stock_id: string;

    @Column({ type: 'decimal', scale: 2, precision: 18 })
    quantity: number;

    @ManyToOne(() => OrderItem)
    @JoinColumn({ name: 'order_item_id' })
    order_item: OrderItem;

    @ManyToOne(() => Stock)
    @JoinColumn({ name: 'stock_id' })
    stock: Stock;

    @ManyToOne(() => Unit)
    @JoinColumn({ name: 'unit_id' })
    unit: Unit;

    @Column({ default: false, type: 'boolean', nullable: true })
    is_delete?: boolean

    @CreateDateColumn()
    created_on: Date;

    @UpdateDateColumn()
    updated_on: Date;

    @DeleteDateColumn()
    deleted_on: Date;
}
