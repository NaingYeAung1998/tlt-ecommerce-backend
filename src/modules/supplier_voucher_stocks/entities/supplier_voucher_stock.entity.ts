import { Stock } from "src/modules/stock/entities/stock.entity";
import { SupplierVoucher } from "src/supplier_voucher/entities/supplier_voucher.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'supplier_voucher_stock' })
export class SupplierVoucherStock {
    @PrimaryColumn({ generated: 'uuid' })
    voucher_stock_id: string;

    //Foreign Keys
    @ManyToOne(() => SupplierVoucher)
    @JoinColumn({ name: 'voucher_id' })
    voucher: SupplierVoucher;

    //Foreign Keys
    @ManyToOne(() => Stock)
    @JoinColumn({ name: 'stock_id' })
    stock: Stock;

    @Column({ default: false, type: 'boolean', nullable: true })
    isDelete?: boolean

    @CreateDateColumn()
    created_on: Date;

    @UpdateDateColumn()
    updated_on: Date;

    @DeleteDateColumn()
    deleted_on: Date;
}
