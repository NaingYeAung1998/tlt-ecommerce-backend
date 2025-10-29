import { Category } from "src/modules/category/entities/category.entity";
import { Grade } from "src/modules/grade/entities/grade.entity";
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

    @Column({ nullable: true })
    note?: string;

    @CreateDateColumn()
    created_on: Date;

    @UpdateDateColumn()
    updated_on: Date;

    @DeleteDateColumn()
    deleted_on: Date;

    //Foreign keys
    @ManyToOne(() => Category)
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @ManyToOne(() => Grade)
    @JoinColumn({ name: 'grade_id' })
    grade: Grade;
}
