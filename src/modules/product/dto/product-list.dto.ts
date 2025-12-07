export class ProductLListDto {
    product_id: string;
    product_name: string;
    product_code: string;
    product_description: string;
    product_category: string;
    product_grade: string;
    product_quantity_per_bag?: string;
    note: string;
    created_on: Date;
}