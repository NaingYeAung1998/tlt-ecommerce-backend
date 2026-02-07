import { Stock } from "src/modules/stock/entities/stock.entity";
import { Unit } from "src/modules/unit/entities/unit.entity";
import { Warehouse } from "src/modules/warehouse/entities/warehouse.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'stock_track' })
export class StockTrack {
    @PrimaryColumn({ generated: 'uuid' })
    track_id: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    quantity: number;

    @Column({ type: 'date' })
    checked_date: Date;

    @Column({ type: 'int' })
    status: StockTrackStatus;

    @Column({ nullable: true })
    note?: string;

    @CreateDateColumn()
    created_on: Date;

    @UpdateDateColumn()
    updated_on: Date;

    @DeleteDateColumn()
    deleted_on: Date;

    //Foreign keys
    @ManyToOne(() => Stock, stock => stock.stock_tracks)
    @JoinColumn({ name: 'stock_id' })
    stock: Stock;

    @ManyToOne(() => Unit)
    @JoinColumn({ name: 'unit_id' })
    unit: Unit;

    @ManyToOne(() => Warehouse)
    @JoinColumn({ name: 'warehouse_id' })
    warehouse: Warehouse;
}

export enum StockTrackStatus {
    DELIVERD = 0,
    STORED = 1
}
