import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ILike, Repository } from 'typeorm';
import { UtilityService } from 'src/core/utility/utility.service';
import { ProductLListDto } from './dto/product-list.dto';
import { Category } from '../category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private utilityService: UtilityService
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
      let data = await this.productRepository.find({ where: { isDelete: false }, order: { product_name: 'ASC' }, relations: ['category', 'grade'] });
      products = data;
      totalLength = data.length;
    } else {
      let [data, length] = await this.productRepository.createQueryBuilder("product")
        .where("product.isDelete = :isDelete AND ( product.product_code Like(:search) OR product.product_name Like(:search) OR product.product_description Like(:search))", { isDelete: false, search: `%${search}%` })
        .orderBy("product.created_on", "DESC")
        .skip(currentPage * perPage)
        .take(perPage)
        .leftJoinAndSelect("product.category", "category")
        .leftJoinAndSelect("product.grade", "grade")
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
    return this.productRepository.findOne({ where: { product_id: id }, relations: ['category', 'grade'] });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productRepository.update({ product_id: id }, updateProductDto)
  }

  async remove(id: string) {
    let product = await this.findOne(id);
    if (!product) {
      throw new HttpException("Product not found", HttpStatus.NOT_FOUND)
    }
    product.isDelete = true;
    return this.productRepository.update({ product_id: id }, product);
  }
}
