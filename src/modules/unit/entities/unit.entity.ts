import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Unit {
    @PrimaryColumn({ generated: 'uuid' })
    unit_id: string;

    @Column()
    unit_name: string;

    @Column({ nullable: true })
    unit_symbol: string;

    @Column({ default: false, type: 'boolean', nullable: true })
    isDelete?: boolean

    @CreateDateColumn()
    created_on: Date;

    @UpdateDateColumn()
    updated_on: Date;

    @DeleteDateColumn()
    deleted_on: Date;
}
