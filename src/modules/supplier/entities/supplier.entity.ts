import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Supplier {
    @PrimaryColumn({ generated: 'uuid' })
    supplier_id: string;

    @Column()
    supplier_name: string;

    @Column({ nullable: true })
    supplier_address?: string;

    @Column({ nullable: true })
    supplier_phone?: string;

    @Column({ nullable: true })
    note?: string;

    @Column({ default: false, type: 'boolean', nullable: true })
    isDelete?: boolean;

    @CreateDateColumn()
    created_on: Date;

    @UpdateDateColumn()
    updated_on: Date;

    @DeleteDateColumn()
    deleted_on: Date;
}
