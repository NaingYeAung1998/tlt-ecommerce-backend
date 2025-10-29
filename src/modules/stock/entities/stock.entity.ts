import { Category } from "src/modules/category/entities/category.entity";
import { Grade } from "src/modules/grade/entities/grade.entity";
import { Product } from "src/modules/product/entities/product.entity";
import { Supplier } from "src/modules/supplier/entities/supplier.entity";
import { Unit } from "src/modules/unit/entities/unit.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Stock {
    @PrimaryColumn({ generated: 'uuid' })
    stock_id: string;

    @Column()
    stock_code: string;

    @Column({ type: 'decimal' })
    quantity: number;

    @Column({ type: 'decimal' })
    buying_price: number;

    @Column({ type: 'decimal' })
    selling_price: number;

    @Column({ type: 'decimal' })
    fix_price: number;

    @Column({ nullable: true })
    note?: string;

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

    @ManyToOne(() => Supplier)
    @JoinColumn({ name: 'supplier_id' })
    supplier: Supplier;
}
