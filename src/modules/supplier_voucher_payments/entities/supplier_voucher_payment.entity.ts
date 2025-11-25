import { Stock } from "src/modules/stock/entities/stock.entity";
import { SupplierVoucher } from "src/supplier_voucher/entities/supplier_voucher.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'supplier_voucher_payment' })
export class SupplierVoucherPayment {
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
    @ManyToOne(() => SupplierVoucher)
    @JoinColumn({ name: 'voucher_id' })
    voucher: SupplierVoucher;
}
