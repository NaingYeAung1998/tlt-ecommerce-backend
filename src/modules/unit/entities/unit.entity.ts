import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Unit {
    @PrimaryColumn({ generated: 'uuid' })
    unit_id: string;

    @Column()
    unit_name: string;

    @Column({ nullable: true })
    unit_symbol: string;

    @Column({ nullable: true, type: 'decimal' })
    quantity_per_parent_unit?: number

    @Column({ default: false, type: 'boolean', nullable: true })
    is_delete?: boolean

    @CreateDateColumn()
    created_on: Date;

    @UpdateDateColumn()
    updated_on: Date;

    @DeleteDateColumn()
    deleted_on: Date;

    //self forieng keys
    @ManyToOne(() => Unit, unit => unit.child_units, { nullable: true })
    @JoinColumn({ name: 'parent_unit_id' })
    parent_unit?: Unit;

    @OneToMany(() => Unit, unit => unit.parent_unit)
    child_units: Unit[];
}
