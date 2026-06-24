export class StockReportListDto {
    product_id: string;
    product_name: string;
    product_code: string;
    product_grade: string;
    product_category: string;
    product_per_bag_qty?: number;
    product_per_bag_unit_id?: string;
    available_quantity: number;
    total_count?: number
}