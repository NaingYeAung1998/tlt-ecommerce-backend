import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { DataSource } from 'typeorm';
import { StockReportListDto } from './dto/report-list.dto';
import { UtilityService } from 'src/core/utility/utility.service';

@Injectable()
export class ReportService {
    constructor(
        private dataSource: DataSource,
        private utilityService: UtilityService
    ) { }
    create(createReportDto: CreateReportDto) {
        return 'This action adds a new report';
    }

    findAll() {
        return `This action returns all report`;
    }

    findOne(id: number) {
        return `This action returns a #${id} report`;
    }

    update(id: number, updateReportDto: UpdateReportDto) {
        return `This action updates a #${id} report`;
    }

    remove(id: number) {
        return `This action removes a #${id} report`;
    }

    async getStockReport(warehouse_id: string, currentPage: number, perPage: number) {
        let rawSql: string;
        let totalLength: number = 0;
        let result: StockReportListDto[] = []
        if (warehouse_id) {
            rawSql = `SELECT 
    p.product_id,
    p.product_name,
    p.product_code,
    p.product_description,
    g.grade_name as product_grade,
    c.category_name as product_category,
    p.quantity_per_bag AS product_per_bag_qty,
    COALESCE(pbu.unit_id, '') AS product_per_bag_unit_id,
    w.warehouse_id,
    w.warehouse_name,
    SUM(
        CASE 
            WHEN st.status IN (1, 3) THEN st.quantity     
            WHEN st.status IN (2, 4)    THEN -st.quantity    
            ELSE 0 
        END
    ) AS available_quantity
FROM 
    stock_track st
INNER JOIN 
    stock s ON st.stock_id = s.stock_id
INNER JOIN 
    product p ON s.product_id = p.product_id
INNER JOIN 
    warehouse w ON st.warehouse_id = w.warehouse_id
LEFT JOIN
    grade g ON p.grade_id = g.grade_id
LEFT JOIN
    category c ON p.category_id = c.category_id
WHERE 
    st.deleted_on IS NULL
    AND s.deleted_on IS NULL
    AND (s.is_delete IS NULL OR s.is_delete = FALSE)
    AND p.deleted_on IS NULL
    AND (p.is_delete IS NULL OR p.is_delete = FALSE)
    AND w.warehouse_id = '${warehouse_id}'
GROUP BY 
    p.product_id,
    p.product_name,
    p.product_code,
    w.warehouse_id,
    w.warehouse_name`;
        }
        else {
            rawSql = `
    WITH delivered_qty AS (
        SELECT
            oi.product_id,
            SUM(ot.quantity) AS delivered_quantity
        FROM order_track ot
        INNER JOIN order_item oi
            ON ot.order_item_id = oi.order_item_id
        WHERE ot.deleted_on IS NULL
        AND ot.status = 0 -- DELIVERED
        AND oi.deleted_on IS NULL
        AND (oi.is_delete IS NULL OR oi.is_delete = FALSE)
        GROUP BY oi.product_id
    )
    SELECT 
    p.product_id,
    p.product_name,
    p.product_code,
    p.product_description,
    g.grade_name as product_grade,
    c.category_name as product_category,
    p.quantity_per_bag AS product_per_bag_qty,
    p.per_bag_unit_id AS product_per_bag_unit_id,
    COUNT(*) OVER() as total_count,
    (
    SUM(
        CASE
            WHEN st.status IN (1, 3) THEN st.quantity
            WHEN st.status = 2 THEN -st.quantity
            ELSE 0
        END
    )
    - COALESCE(MAX(dq.delivered_quantity), 0)
) AS available_quantity
FROM 
    stock_track st
INNER JOIN 
    stock s ON st.stock_id = s.stock_id
INNER JOIN 
    product p ON s.product_id = p.product_id
INNER JOIN 
    warehouse w ON st.warehouse_id = w.warehouse_id
LEFT JOIN
    grade g ON p.grade_id = g.grade_id
LEFT JOIN
    category c ON p.category_id = c.category_id
LEFT JOIN delivered_qty dq
    ON dq.product_id = p.product_id
WHERE 
    st.deleted_on IS NULL
    AND s.deleted_on IS NULL
    AND (s.is_delete IS NULL OR s.is_delete = FALSE)
    AND p.deleted_on IS NULL
    AND (p.is_delete IS NULL OR p.is_delete = FALSE)
GROUP BY 
    p.product_id,
    p.product_name,
    p.product_code,
    p.product_description,
    product_grade,
    product_category,
    product_per_bag_qty,
    product_per_bag_unit_id
ORDER BY
    available_quantity DESC
    `
            if (perPage >= 0) {
                rawSql += `LIMIT ${perPage}
                OFFSET ${currentPage * perPage};`
            }
        }

        result = await this.dataSource.query(rawSql);
        totalLength = result[0].total_count
        return this.utilityService.createPaginationList(result, currentPage, perPage, totalLength);
    }
}
