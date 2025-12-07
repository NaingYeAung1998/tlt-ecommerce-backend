import { Product } from "src/modules/product/entities/product.entity";
export declare class Grade {
    grade_id: string;
    grade_name: string;
    grade_description?: string;
    is_delete?: boolean;
    created_on: Date;
    updated_on: Date;
    deleted_on: Date;
    products: Product[];
}
