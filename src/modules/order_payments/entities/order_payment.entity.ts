import { Order } from "src/modules/order/entities/order.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'order_payment' })
export class OrderPayment {
    @PrimaryColumn({ generated: 'uuid' })
    order_payment_id: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
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
    @ManyToOne(() => Order)
    @JoinColumn({ name: 'order_id' })
    order: Order;
}
