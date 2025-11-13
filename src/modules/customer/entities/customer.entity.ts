import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Customer {
    @PrimaryColumn({ generated: 'uuid' })
    customer_id: string;

    @Column()
    customer_name: string;

    @Column({ nullable: true })
    customer_address?: string;

    @Column({ nullable: true })
    customer_phone?: string;

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
