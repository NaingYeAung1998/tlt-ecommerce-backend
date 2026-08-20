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

    async getDailySalesSummary(date: string, customerId?: string) {
        const parameters: unknown[] = [date];
        let customerFilter = '';

        if (customerId) {
            customerFilter = 'AND customer_order.customer_id = ?';
            parameters.push(customerId);
        }

        const rawSql = `
            SELECT
                COALESCE(SUM(order_totals.revenue), 0) AS revenue,
                COALESCE(SUM(order_totals.cost), 0) AS cost
            FROM (
                SELECT
                    customer_order.order_id,
                    COALESCE(item_totals.revenue, 0) + COALESCE(customer_order.other_charges, 0) AS revenue,
                    COALESCE(cost_totals.cost, 0) AS cost
                FROM \`order\` customer_order
                LEFT JOIN (
                    SELECT
                        order_item.order_id,
                        SUM(order_item.selling_price) AS revenue
                    FROM order_item
                    WHERE order_item.deleted_on IS NULL
                      AND (order_item.is_delete IS NULL OR order_item.is_delete = FALSE)
                    GROUP BY order_item.order_id
                ) item_totals ON item_totals.order_id = customer_order.order_id
                LEFT JOIN (
                    SELECT
                        order_item.order_id,
                        SUM(order_item_stock.quantity * stock.buying_price_lowest_unit) AS cost
                    FROM order_item_stock
                    INNER JOIN order_item
                        ON order_item.order_item_id = order_item_stock.order_item_id
                    INNER JOIN stock
                        ON stock.stock_id = order_item_stock.stock_id
                    WHERE order_item_stock.deleted_on IS NULL
                      AND (order_item_stock.is_delete IS NULL OR order_item_stock.is_delete = FALSE)
                      AND order_item.deleted_on IS NULL
                      AND (order_item.is_delete IS NULL OR order_item.is_delete = FALSE)
                    GROUP BY order_item.order_id
                ) cost_totals ON cost_totals.order_id = customer_order.order_id
                WHERE customer_order.order_date = ?
                  AND customer_order.deleted_on IS NULL
                  AND (customer_order.is_delete IS NULL OR customer_order.is_delete = FALSE)
                  ${customerFilter}
            ) order_totals
        `;

        const [result] = await this.dataSource.query(rawSql, parameters);
        const revenue = Number(result?.revenue || 0);
        const cost = Number(result?.cost || 0);
        const profit = revenue - cost;
        const margin = revenue > 0 ? (profit / revenue) * 100 : 0;

        return {
            date,
            customer_id: customerId || null,
            revenue,
            cost,
            profit,
            margin: Number(margin.toFixed(2))
        };
    }

    async getProductSalesReport(query: {
        fromDate: string,
        toDate: string,
        categoryId?: string,
        productId?: string,
        sortBy?: 'best-sellers' | 'slow-movers',
        currentPage?: number,
        perPage?: number
    }) {
        const currentPage = Math.max(Number(query.currentPage) || 0, 0);
        const perPage = Math.max(Number(query.perPage) || 10, 1);
        const parameters: unknown[] = [query.fromDate, query.toDate, query.fromDate, query.toDate];
        const filters: string[] = [
            'product.deleted_on IS NULL',
            '(product.is_delete IS NULL OR product.is_delete = FALSE)'
        ];

        if (query.categoryId) {
            filters.push('product.category_id = ?');
            parameters.push(query.categoryId);
        }
        if (query.productId) {
            filters.push('product.product_id = ?');
            parameters.push(query.productId);
        }

        const sortDirection = query.sortBy === 'slow-movers' ? 'ASC' : 'DESC';
        const rawSql = `
            SELECT
                product.product_id,
                product.product_code,
                product.product_name,
                category.category_name AS category,
                product.quantity_per_bag AS product_per_bag_qty,
                product.per_bag_unit_id AS product_per_bag_unit_id,
                COALESCE(sales.quantity_sold, 0) AS quantity_sold,
                COALESCE(sales.revenue, 0) AS revenue,
                COALESCE(costs.cost, 0) AS cost,
                COALESCE(sales.revenue, 0) - COALESCE(costs.cost, 0) AS profit,
                CASE
                    WHEN COALESCE(sales.revenue, 0) > 0 THEN
                        ((COALESCE(sales.revenue, 0) - COALESCE(costs.cost, 0)) / sales.revenue) * 100
                    ELSE 0
                END AS margin,
                COUNT(*) OVER() AS total_count
            FROM product
            LEFT JOIN category ON category.category_id = product.category_id
            LEFT JOIN (
                SELECT
                    order_item.product_id,
                    SUM(order_item.quantity) AS quantity_sold,
                    SUM(order_item.selling_price) AS revenue
                FROM order_item
                INNER JOIN \`order\` customer_order
                    ON customer_order.order_id = order_item.order_id
                WHERE customer_order.order_date BETWEEN ? AND ?
                  AND customer_order.deleted_on IS NULL
                  AND (customer_order.is_delete IS NULL OR customer_order.is_delete = FALSE)
                  AND order_item.deleted_on IS NULL
                  AND (order_item.is_delete IS NULL OR order_item.is_delete = FALSE)
                GROUP BY order_item.product_id
            ) sales ON sales.product_id = product.product_id
            LEFT JOIN (
                SELECT
                    order_item.product_id,
                    SUM(order_item_stock.quantity * stock.buying_price_lowest_unit) AS cost
                FROM order_item_stock
                INNER JOIN order_item
                    ON order_item.order_item_id = order_item_stock.order_item_id
                INNER JOIN \`order\` customer_order
                    ON customer_order.order_id = order_item.order_id
                INNER JOIN stock
                    ON stock.stock_id = order_item_stock.stock_id
                WHERE customer_order.order_date BETWEEN ? AND ?
                  AND customer_order.deleted_on IS NULL
                  AND (customer_order.is_delete IS NULL OR customer_order.is_delete = FALSE)
                  AND order_item.deleted_on IS NULL
                  AND (order_item.is_delete IS NULL OR order_item.is_delete = FALSE)
                  AND order_item_stock.deleted_on IS NULL
                  AND (order_item_stock.is_delete IS NULL OR order_item_stock.is_delete = FALSE)
                GROUP BY order_item.product_id
            ) costs ON costs.product_id = product.product_id
            WHERE ${filters.join(' AND ')}
            ORDER BY quantity_sold ${sortDirection}, product.product_name ASC
            LIMIT ${perPage} OFFSET ${currentPage * perPage}
        `;

        const result = await this.dataSource.query(rawSql, parameters);
        const totalLength = Number(result[0]?.total_count || 0);
        const data = result.map((row: any) => ({
            ...row,
            quantity_sold: Number(row.quantity_sold || 0),
            revenue: Number(row.revenue || 0),
            cost: Number(row.cost || 0),
            profit: Number(row.profit || 0),
            margin: Number(Number(row.margin || 0).toFixed(2))
        }));

        return this.utilityService.createPaginationList(data, currentPage, perPage, totalLength);
    }

    async getInventoryReport(query: {
        warehouseId?: string,
        categoryId?: string,
        productId?: string,
        supplierId?: string,
        sortBy?: 'code' | 'highest' | 'lowest',
        currentPage?: number,
        perPage?: number
    }) {
        const currentPage = Math.max(Number(query.currentPage) || 0, 0);
        const perPage = Math.max(Number(query.perPage) || 10, 1);
        const movementFilters: string[] = [
            'stock_track.deleted_on IS NULL',
            'stock.deleted_on IS NULL',
            '(stock.is_delete IS NULL OR stock.is_delete = FALSE)'
        ];
        const outerFilters: string[] = [
            'product.deleted_on IS NULL',
            '(product.is_delete IS NULL OR product.is_delete = FALSE)'
        ];
        const parameters: unknown[] = [];

        if (query.warehouseId) {
            movementFilters.push('stock_track.warehouse_id = ?');
            parameters.push(query.warehouseId);
            outerFilters.push('movements.product_id IS NOT NULL');
        }
        if (query.supplierId) {
            movementFilters.push('stock.supplier_id = ?');
            parameters.push(query.supplierId);
            outerFilters.push('movements.product_id IS NOT NULL');
        }
        if (query.categoryId) {
            outerFilters.push('product.category_id = ?');
            parameters.push(query.categoryId);
        }
        if (query.productId) {
            outerFilters.push('product.product_id = ?');
            parameters.push(query.productId);
        }

        const sortExpression = query.sortBy === 'lowest'
            ? 'available ASC, product.product_code ASC'
            : query.sortBy === 'highest'
                ? 'available DESC, product.product_code ASC'
                : 'product.product_code ASC';

        const rawSql = `
            SELECT
                product.product_id,
                product.product_code,
                product.product_name,
                category.category_name AS category,
                grade.grade_name AS grade,
                product.quantity_per_bag AS product_per_bag_qty,
                product.per_bag_unit_id AS product_per_bag_unit_id,
                GREATEST(
                    COALESCE(movements.stock_balance, 0) - LEAST(COALESCE(deliveries.delivered, 0), COALESCE(movements.sold, 0)),
                    0
                ) AS current_stock,
                GREATEST(
                    COALESCE(movements.sold, 0) - LEAST(COALESCE(deliveries.delivered, 0), COALESCE(movements.sold, 0)),
                    0
                ) AS reserved,
                GREATEST(COALESCE(movements.stock_balance, 0) - COALESCE(movements.sold, 0), 0) AS available,
                COUNT(*) OVER() AS total_count
            FROM product
            LEFT JOIN category ON category.category_id = product.category_id
            LEFT JOIN grade ON grade.grade_id = product.grade_id
            LEFT JOIN (
                SELECT
                    stock.product_id,
                    SUM(CASE
                        WHEN stock_track.status IN (1, 3) THEN stock_track.quantity
                        WHEN stock_track.status = 2 THEN -stock_track.quantity
                        ELSE 0
                    END) AS stock_balance,
                    SUM(CASE WHEN stock_track.status = 4 THEN stock_track.quantity ELSE 0 END) AS sold
                FROM stock_track
                INNER JOIN stock ON stock.stock_id = stock_track.stock_id
                WHERE ${movementFilters.join(' AND ')}
                GROUP BY stock.product_id
            ) movements ON movements.product_id = product.product_id
            LEFT JOIN (
                SELECT
                    order_item.product_id,
                    SUM(order_track.quantity) AS delivered
                FROM order_track
                INNER JOIN order_item ON order_item.order_item_id = order_track.order_item_id
                INNER JOIN \`order\` customer_order ON customer_order.order_id = order_item.order_id
                WHERE order_track.deleted_on IS NULL
                  AND order_track.status = 0
                  AND order_item.deleted_on IS NULL
                  AND (order_item.is_delete IS NULL OR order_item.is_delete = FALSE)
                  AND customer_order.deleted_on IS NULL
                  AND (customer_order.is_delete IS NULL OR customer_order.is_delete = FALSE)
                GROUP BY order_item.product_id
            ) deliveries ON deliveries.product_id = product.product_id
            WHERE ${outerFilters.join(' AND ')}
            ORDER BY ${sortExpression}
            LIMIT ${perPage} OFFSET ${currentPage * perPage}
        `;

        const result = await this.dataSource.query(rawSql, parameters);
        const totalLength = Number(result[0]?.total_count || 0);
        const data = result.map((row: any) => ({
            ...row,
            current_stock: Number(row.current_stock || 0),
            reserved: Number(row.reserved || 0),
            available: Number(row.available || 0)
        }));

        return this.utilityService.createPaginationList(data, currentPage, perPage, totalLength);
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
