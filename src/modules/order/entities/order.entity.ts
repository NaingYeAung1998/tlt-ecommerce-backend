import { Customer } from "src/modules/customer/entities/customer.entity";
import { OrderItem } from "src/modules/order_items/entities/order_item.entity";
import { OrderPayment } from "src/modules/order_payments/entities/order_payment.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryColumn({ generated: 'uuid' })
    order_id: string;

    @Column()
    voucher_code: string;

    @Column({ type: 'date' })
    order_date: Date;

    @Column({ nullable: true })
    customer_name?: string;

    @Column({ nullable: true })
    address?: string;

    @Column({ nullable: true })
    note?: string;

    @Column({ default: false, type: 'boolean', nullable: true })
    is_delete?: boolean;

    @CreateDateColumn()
    created_on: Date;

    @UpdateDateColumn()
    updated_on: Date;

    @DeleteDateColumn()
    deleted_on: Date;

    //Foreign keys
    @ManyToOne(() => Customer, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'customer_id' })
    customer?: Customer;

    @OneToMany(() => OrderItem, order_item => order_item.order, { cascade: true })
    items: OrderItem[];

    @OneToMany(() => OrderPayment, order_payment => order_payment.order, { cascade: true })
    payments: OrderPayment[];

}
