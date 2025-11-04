import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { UtilityService } from 'src/core/utility/utility.service';
export declare class CategoryService {
    private categoryRepository;
    private utilityService;
    constructor(categoryRepository: Repository<Category>, utilityService: UtilityService);
    create(createCategoryDto: CreateCategoryDto): void;
    findAll(search: string, currentPage: number, perPage: number): Promise<import("../../core/utility/dto/pagination-list.dto").PaginationList | Category[]>;
    findOne(id: string): Promise<Category>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): string;
}
