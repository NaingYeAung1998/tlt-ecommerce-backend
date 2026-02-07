import { Category } from "src/modules/category/entities/category.entity";
import { Grade } from "src/modules/grade/entities/grade.entity";
import { Product } from "src/modules/product/entities/product.entity";
import { StockTrack } from "src/modules/stock_track/entities/stock_track.entity";
import { Supplier } from "src/modules/supplier/entities/supplier.entity";
import { Unit } from "src/modules/unit/entities/unit.entity";
import { Warehouse } from "src/modules/warehouse/entities/warehouse.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Stock {
    @PrimaryColumn({ generated: 'uuid' })
    stock_id: string;

    @Column()
    stock_code: string;

    @Column({ type: 'decimal', precision: 18, scale: 2 })
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    buying_price: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    selling_price: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    wholesale_selling_price: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    fix_price: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    wholesale_fix_price: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    wholesale_starting_quantity: number;

    @Column({ nullable: true })
    note?: string;

    @Column({ default: false, type: 'boolean', nullable: true })
    is_delete?: boolean;

    @CreateDateColumn()
    created_on: Date;

    @UpdateDateColumn()
    updated_on: Date;

    @DeleteDateColumn()
    deleted_on: Date;

    //Foreign keys
    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @ManyToOne(() => Unit)
    @JoinColumn({ name: 'unit_id' })
    unit: Unit;

    @ManyToOne(() => Unit)
    @JoinColumn({ name: 'wholesale_starting_unit_id' })
    wholesale_starting_unit: Unit;

    @ManyToOne(() => Supplier)
    @JoinColumn({ name: 'supplier_id' })
    supplier: Supplier;

    @ManyToOne(() => Warehouse)
    @JoinColumn({ name: 'warehouse_id' })
    warehouse: Warehouse;

    @OneToMany(() => StockTrack, stock_track => stock_track.stock)
    stock_tracks: StockTrack[];
}
