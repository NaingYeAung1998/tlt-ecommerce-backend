import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ILike, Repository } from 'typeorm';
import { UtilityService } from 'src/core/utility/utility.service';
import { ProductLListDto } from './dto/product-list.dto';
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
    let products = [];
    let totalLength = 0
    if (perPage < 0) {
      let data = await this.productRepository.find({ where: { is_delete: false }, order: { product_name: 'ASC' }, relations: ['category', 'grade'] });
      products = data;
      totalLength = data.length;
    } else {
      let [data, length] = await this.productRepository.createQueryBuilder("product")
        .where("product.is_delete = :is_delete AND ( product.product_code Like(:search) OR product.product_name Like(:search) OR product.product_description Like(:search))", { is_delete: false, search: `%${search}%` })
        .orderBy("product.product_code", "DESC")
        .skip(currentPage * perPage)
        .take(perPage)
        .leftJoinAndSelect("product.category", "category")
        .leftJoinAndSelect("product.grade", "grade")
        .leftJoinAndSelect("product.per_bag_unit", "per_bag_unit")
        .getManyAndCount();

      products = data
      totalLength = length
    }
    let productList: ProductLListDto[] = [];
    products.forEach((product, index) => {
      let productObj: ProductLListDto = {
        product_id: product.product_id,
        product_name: product.product_name,
        product_code: product.product_code,
        product_description: product.product_description,
        product_category: product.category?.category_name,
        product_grade: product.grade?.grade_name,
        product_quantity_per_bag: product.per_bag_unit ? `${product.quantity_per_bag} ${product.per_bag_unit.unit_name}` : "",
        note: product.note,
        created_on: product.created_on
      }
      productList.push(productObj);
    })
    if (perPage < 0) {
      return productList;
    } else {
      return this.utilityService.createPaginationList(productList, currentPage, perPage, totalLength)
    }

  }
  findOne(id: string) {
    return this.productRepository.findOne({ where: { product_id: id }, relations: ['category', 'grade', 'per_bag_unit'] });
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
