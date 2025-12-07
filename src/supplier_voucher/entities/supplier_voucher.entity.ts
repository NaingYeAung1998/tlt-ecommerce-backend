import { Supplier } from "src/modules/supplier/entities/supplier.entity";
import { SupplierVoucherPayment } from "src/modules/supplier_voucher_payments/entities/supplier_voucher_payment.entity";
import { SupplierVoucherStock } from "src/modules/supplier_voucher_stocks/entities/supplier_voucher_stock.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'supplier_voucher' })
export class SupplierVoucher {
    @PrimaryColumn({ generated: 'uuid' })
    voucher_id: string;

    @Column()
    voucher_code: string;

    //Foreign Keys
    @ManyToOne(() => Supplier)
    @JoinColumn({ name: 'supplier_id' })
    supplier: Supplier

    @OneToMany(() => SupplierVoucherStock, supplier_voucher_stock => supplier_voucher_stock.voucher, { cascade: true })
    stocks: SupplierVoucherStock[];

    @OneToMany(() => SupplierVoucherPayment, supplier_voucher_payment => supplier_voucher_payment.voucher, { cascade: true })
    payments: SupplierVoucherPayment[];

    @Column({ default: false, type: 'boolean', nullable: true })
    is_delete?: boolean

    @CreateDateColumn()
    created_on: Date;

    @UpdateDateColumn()
    updated_on: Date;

    @DeleteDateColumn()
    deleted_on: Date;
}
