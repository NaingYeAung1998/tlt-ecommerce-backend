import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({})
export class Warehouse {
    @PrimaryColumn({ generated: 'uuid' })
    warehouse_id: string;

    @Column()
    warehouse_name: string;

    @Column({ nullable: true })
    warehouse_phone?: string;

    @Column({ nullable: true })
    warehouse_address?: string;

    @Column({ nullable: true })
    note?: string;

    @Column({ default: false, type: 'boolean', nullable: true })
    isDelete?: Boolean

    @CreateDateColumn()
    created_on: Date;

    @UpdateDateColumn()
    updated_on: Date;

    @DeleteDateColumn()
    deleted_on: Date;
}
