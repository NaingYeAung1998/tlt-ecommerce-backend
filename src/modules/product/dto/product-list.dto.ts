export class ProductListDto {
    product_id: string;
    product_name: string;
    product_code: string;
    product_description: string;
    product_category: string;
    product_grade: string;
    product_quantity_per_bag?: string;
    product_per_bag_qty?: number;
    product_per_bag_unit_id?: string;
    selling_price: number;
    wholesale_selling_price: number;
    fix_price: number;
    wholesale_fix_price: number;
    wholesale_starting_quantity: number;
    note: string;
    created_on: Date;
}