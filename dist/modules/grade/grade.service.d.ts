import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { Repository } from 'typeorm';
import { Grade } from './entities/grade.entity';
import { UtilityService } from 'src/core/utility/utility.service';
export declare class GradeService {
    private gradeRepository;
    private utilityService;
    constructor(gradeRepository: Repository<Grade>, utilityService: UtilityService);
    create(createGradeDto: CreateGradeDto): void;
    findAll(search: string, currentPage: number, perPage: number): Promise<import("../../core/utility/dto/pagination-list.dto").PaginationList | Grade[]>;
    findOne(id: string): Promise<Grade>;
    update(id: string, updateGradeDto: UpdateGradeDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): string;
}
