import { Stock } from "src/modules/stock/entities/stock.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'stock_payment' })
export class StockPayment {
    @PrimaryColumn({ generated: 'uuid' })
    payment_id: string;

    @Column({ type: 'decimal' })
    amount: number;

    @Column({ type: 'date' })
    payment_date: Date;

    @Column()
    payment_channel?: string;

    @Column({ nullable: true })
    note?: string;

    @CreateDateColumn()
    created_on: Date;

    @UpdateDateColumn()
    updated_on: Date;

    @DeleteDateColumn()
    deleted_on: Date;

    //Foreign Keys
    @ManyToOne(() => Stock)
    @JoinColumn({ name: 'stock_id' })
    stock: Stock;
}
