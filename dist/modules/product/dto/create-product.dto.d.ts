export declare class CreateProductDto {
    product_name: string;
    product_code?: string;
    product_description?: string;
    note?: string;
    category: CreatePrdocutCategoryDto;
    grade: CreateProductGradeDto;
}
export declare class CreatePrdocutCategoryDto {
    category_id: string;
}
export declare class CreateProductGradeDto {
    grade_id: string;
}
