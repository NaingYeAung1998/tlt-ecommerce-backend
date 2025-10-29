import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Grade {
    @PrimaryColumn({ generated: 'uuid' })
    grade_id: string;

    @Column()
    grade_name: string;

    @Column({ nullable: true })
    grade_description?: string;

    @CreateDateColumn()
    created_on: Date;

    @UpdateDateColumn()
    updated_on: Date;

    @DeleteDateColumn()
    deleted_on: Date;
}
