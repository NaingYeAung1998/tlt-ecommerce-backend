import { SupplierVoucherPayment } from "src/modules/supplier_voucher_payments/entities/supplier_voucher_payment.entity";
import { SupplierVoucherStock } from "src/modules/supplier_voucher_stocks/entities/supplier_voucher_stock.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'supplier_voucher' })
export class SupplierVoucher {
    @PrimaryColumn({ generated: 'uuid' })
    voucher_id: string;

    @Column()
    voucher_code: string;

    @Column({ nullable: true, type: 'decimal' })
    total_amount?: number;

    //Foreign Keys
    @OneToMany(() => SupplierVoucherStock, supplier_voucher_stock => supplier_voucher_stock.voucher)
    stocks: SupplierVoucherStock[];

    @OneToMany(() => SupplierVoucherPayment, supplier_voucher_payment => supplier_voucher_payment.voucher)
    payments: SupplierVoucherStock[];

    @Column({ default: false, type: 'boolean', nullable: true })
    isDelete?: boolean

    @CreateDateColumn()
    created_on: Date;

    @UpdateDateColumn()
    updated_on: Date;

    @DeleteDateColumn()
    deleted_on: Date;
}
