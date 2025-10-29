import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty()
    product_name: string;
    @ApiProperty()
    product_code?: string;
    @ApiProperty()
    product_description?: string;
    @ApiProperty()
    note?: string;
    category: CreatePrdocutCategoryDto;
    grade: CreateProductGradeDto;
}

export class CreatePrdocutCategoryDto {
    category_id: string
}

export class CreateProductGradeDto {
    grade_id: string;
}