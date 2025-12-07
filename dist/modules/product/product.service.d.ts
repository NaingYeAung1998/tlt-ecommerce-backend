import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { UtilityService } from 'src/core/utility/utility.service';
import { ProductLListDto } from './dto/product-list.dto';
import { UnitService } from '../unit/unit.service';
export declare class ProductService {
    private productRepository;
    private utilityService;
    private unitService;
    constructor(productRepository: Repository<Product>, utilityService: UtilityService, unitService: UnitService);
    create(createProductDto: CreateProductDto): Promise<CreateProductDto & Product>;
    findAll(search: string, currentPage: number, perPage: number): Promise<import("../../core/utility/dto/pagination-list.dto").PaginationList | ProductLListDto[]>;
    findOne(id: string): Promise<Product>;
    findProductUnitHiearchy(id: string): Promise<any[]>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").UpdateResult>;
}
