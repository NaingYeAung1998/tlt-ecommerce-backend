import { Category } from "src/modules/category/entities/category.entity";
import { Grade } from "src/modules/grade/entities/grade.entity";
import { Unit } from "src/modules/unit/entities/unit.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryColumn({ generated: 'uuid' })
    product_id: string;

    @Column()
    product_name: string;

    @Column({ nullable: true })
    product_code?: string;

    @Column({ nullable: true })
    product_description?: string;

    @Column({ nullable: true, type: 'decimal', scale: 2, precision: 10 })
    quantity_per_bag?: number;

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
    @ManyToOne(() => Category, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @ManyToOne(() => Grade, grade => grade.products, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'grade_id' })
    grade?: Grade;

    @ManyToOne(() => Unit, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'per_bag_unit_id' })
    per_bag_unit: Unit;
}
