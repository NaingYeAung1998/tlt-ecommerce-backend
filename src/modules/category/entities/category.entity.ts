import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryColumn({ generated: 'uuid' })
    category_id: string;

    @Column()
    category_name: string;

    @Column({ nullable: true })
    category_description?: string;

    @CreateDateColumn()
    created_on: Date;

    @UpdateDateColumn()
    updated_on: Date;

    @DeleteDateColumn()
    deleted_on: Date;
}
