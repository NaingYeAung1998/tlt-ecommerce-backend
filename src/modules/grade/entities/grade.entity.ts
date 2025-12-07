import { Product } from "src/modules/product/entities/product.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Grade {
    @PrimaryColumn({ generated: 'uuid' })
    grade_id: string;

    @Column()
    grade_name: string;

    @Column({ nullable: true })
    grade_description?: string;

    @Column({ default: false, type: 'boolean', nullable: true })
    is_delete?: boolean;

    @CreateDateColumn()
    created_on: Date;

    @UpdateDateColumn()
    updated_on: Date;

    @DeleteDateColumn()
    deleted_on: Date;

    //Foreign Key
    @OneToMany(() => Product, product => product.grade)
    products: Product[];
}
