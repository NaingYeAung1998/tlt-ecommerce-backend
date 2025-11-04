import { Category } from "src/modules/category/entities/category.entity";
import { Grade } from "src/modules/grade/entities/grade.entity";
export declare class Product {
    product_id: string;
    product_name: string;
    product_code?: string;
    product_description?: string;
    note?: string;
    created_on: Date;
    updated_on: Date;
    deleted_on: Date;
    category: Category;
    grade: Grade;
}
