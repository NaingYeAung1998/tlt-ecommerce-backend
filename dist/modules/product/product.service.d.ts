import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { UtilityService } from 'src/core/utility/utility.service';
import { ProductLListDto } from './dto/product-list.dto';
export declare class ProductService {
    private productRepository;
    private utilityService;
    constructor(productRepository: Repository<Product>, utilityService: UtilityService);
    create(createProductDto: CreateProductDto): Promise<CreateProductDto & Product>;
    findAll(search: string, currentPage: number, perPage: number): Promise<import("../../core/utility/dto/pagination-list.dto").PaginationList | ProductLListDto[]>;
    findOne(id: string): Promise<Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): string;
}
