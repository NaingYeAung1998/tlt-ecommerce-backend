import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ILike, Repository } from 'typeorm';
import { UtilityService } from 'src/core/utility/utility.service';
import { ProductListDto } from './dto/product-list.dto';
import { Category } from '../category/entities/category.entity';
import { UnitService } from '../unit/unit.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private utilityService: UtilityService,
    private unitService: UnitService
  ) { }
  async create(createProductDto: CreateProductDto) {
    try {
      let existingProduct = await this.productRepository.findOne({ where: { product_code: createProductDto.product_code } });
      if (existingProduct) {
        throw new HttpException('Duplicate Product Code', HttpStatus.BAD_REQUEST)
      }
      return this.productRepository.save(createProductDto);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  async findAll(search: string, currentPage: number, perPage: number) {
    let productList: ProductListDto[] = [];
    let totalLength = 0

    let queryBuilder = `
        SELECT 
    p.product_id,
    p.product_name,
    p.product_code,
    p.product_description,
    c.category_name AS product_category,
    g.grade_name AS product_grade,
    CASE 
        WHEN pbu.unit_id IS NOT NULL THEN CONCAT(p.quantity_per_bag, ' ', pbu.unit_name)
        ELSE ''
    END AS product_quantity_per_bag,
    p.quantity_per_bag AS product_per_bag_qty,
    COALESCE(pbu.unit_id, '') AS product_per_bag_unit_id,
    p.selling_price,
    p.fix_price,
    p.wholesale_selling_price,
    p.wholesale_fix_price,
    p.wholesale_starting_quantity,
    oid.total_missing_quantity AS missing_quantity,
    oid.unit_id AS lowest_unit_id,
    p.note,
    p.created_on,
    COUNT(*) OVER() as total_count
FROM product p
LEFT JOIN category c ON p.category_id = c.category_id
LEFT JOIN grade g ON p.grade_id = g.grade_id
LEFT JOIN unit pbu ON p.per_bag_unit_id = pbu.unit_id
LEFT JOIN (SELECT oi.product_id, oi.unit_id, SUM(oi.missing_quantity) total_missing_quantity FROM order_item oi GROUP BY oi.product_id, oi.unit_id) 
oid ON oid.product_id = p.product_id
WHERE p.is_delete = false
  AND (
      p.product_code LIKE '%${search ? search : ''}%'
      OR p.product_name LIKE  '%${search ? search : ''}%'
      OR p.product_description LIKE '%${search ? search : ''}%'
  )
ORDER BY p.product_code ASC
      `;
    if (perPage >= 0) {
      queryBuilder += `LIMIT ${perPage} OFFSET ${currentPage * perPage};`
    }
    productList = await this.productRepository.query(queryBuilder);
    if (productList && productList.length > 0) {
      totalLength = productList[0].total_count
    }
    if (perPage < 0) {
      return productList;
    } else {
      return this.utilityService.createPaginationList(productList, currentPage, perPage, totalLength)
    }
  }

  findOne(id: string) {
    return this.productRepository.findOne({ where: { product_id: id }, relations: ['category', 'grade', 'per_bag_unit', 'wholesale_starting_unit'] });
  }

  async findProductUnitHiearchy(id: string) {
    let product = await this.findOne(id);
    if (!product || !product.per_bag_unit) {
      throw new HttpException('Please Define Product Unit', HttpStatus.BAD_REQUEST);
    }
    let unitHiearchy = await this.unitService.getUnitHierarchy(product.per_bag_unit.unit_id);
    let bagUnit = { unit_id: process.env.BAG_UNIT_ID, unit_name: process.env.BAG_UNIT_NAME }
    let bagConnectedUnitIndex = unitHiearchy.findIndex(x => x.unit_id == product.per_bag_unit.unit_id);
    if (bagConnectedUnitIndex < 0) {
      throw new HttpException('Please Define Product Unit', HttpStatus.BAD_REQUEST);
    }
    unitHiearchy[bagConnectedUnitIndex].parent_unit = bagUnit;
    unitHiearchy[bagConnectedUnitIndex].quantity_per_parent_unit = product.quantity_per_bag;
    unitHiearchy.splice(0, bagConnectedUnitIndex);
    unitHiearchy.unshift(bagUnit);
    return unitHiearchy;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productRepository.update({ product_id: id }, updateProductDto)
  }

  async remove(id: string) {
    let product = await this.findOne(id);
    if (!product) {
      throw new HttpException("Product not found", HttpStatus.NOT_FOUND)
    }
    product.is_delete = true;
    return this.productRepository.update({ product_id: id }, product);
  }
}
