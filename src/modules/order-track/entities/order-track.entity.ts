import { OrderItem } from "src/modules/order_items/entities/order_item.entity";
import { Unit } from "src/modules/unit/entities/unit.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'order_track' })
export class OrderTrack {
    @PrimaryColumn({ generated: 'uuid' })
    track_id: string;

    @Column({ type: 'decimal', precision: 18, scale: 2 })
    quantity: number;

    @Column({ type: 'date' })
    checked_date: Date;

    @Column({ type: 'int' })
    status: OrderTrackStatus;

    @Column({ nullable: true })
    note?: string;

    @CreateDateColumn()
    created_on: Date;

    @UpdateDateColumn()
    updated_on: Date;

    @DeleteDateColumn()
    deleted_on: Date;

    //Foreign keys
    @ManyToOne(() => OrderItem)
    @JoinColumn({ name: 'order_item_id' })
    order_item: OrderItem;

    @ManyToOne(() => Unit)
    @JoinColumn({ name: 'unit_id' })
    unit: Unit;
}

export enum OrderTrackStatus {
    DELIVERED = 0
}