import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ILike, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { UtilityService } from 'src/core/utility/utility.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private utilityService: UtilityService
  ) { }
  create(createCategoryDto: CreateCategoryDto) {
    this.categoryRepository.save(createCategoryDto);
  }

  async findAll(search: string, currentPage: number, perPage: number) {
    if (perPage < 0) {
      return await this.categoryRepository.find({ where: { is_delete: false }, order: { category_name: 'ASC' } });
    } else {
      let [data, totalLength] = await this.categoryRepository.createQueryBuilder("category")
        .where("category.is_delete = :is_delete AND ( category.category_name Like(:search) OR category.category_description Like(:search))", { is_delete: false, search: `%${search}%` })
        .orderBy("category.created_on", "DESC")
        .skip(currentPage * perPage)
        .take(perPage)
        .getManyAndCount();
      return this.utilityService.createPaginationList(data, currentPage, perPage, totalLength);
    }
  }

  findOne(id: string) {
    return this.categoryRepository.findOne({ where: { category_id: id } });
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.update({ category_id: id }, updateCategoryDto);
  }

  async remove(id: string) {
    let category = await this.findOne(id)
    if (!category) {
      throw new HttpException("Category not found", HttpStatus.NOT_FOUND);
    }
    category.is_delete = true;
    return this.categoryRepository.update({ category_id: id }, category);
  }
}
