import { Injectable } from '@nestjs/common';
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
      return await this.categoryRepository.find({ order: { category_name: 'ASC' } });
    } else {
      let [data, toatlLength] = await this.categoryRepository.findAndCount({
        where: [
          { category_name: ILike(`%${search}%`) },
          { category_description: ILike(`%${search}%`) },
        ],
        order: { created_on: 'DESC' },
        skip: currentPage * perPage,
        take: perPage
      });
      return this.utilityService.createPaginationList(data, currentPage, perPage, toatlLength);
    }
  }

  findOne(id: string) {
    return this.categoryRepository.findOne({ where: { category_id: id } });
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.update({ category_id: id }, updateCategoryDto);
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
