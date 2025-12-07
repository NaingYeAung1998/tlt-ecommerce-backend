import { Category } from "src/modules/category/entities/category.entity";
import { Grade } from "src/modules/grade/entities/grade.entity";
import { Unit } from "src/modules/unit/entities/unit.entity";
export declare class Product {
    product_id: string;
    product_name: string;
    product_code?: string;
    product_description?: string;
    quantity_per_bag?: number;
    note?: string;
    is_delete?: boolean;
    created_on: Date;
    updated_on: Date;
    deleted_on: Date;
    category: Category;
    grade?: Grade;
    per_bag_unit: Unit;
}
