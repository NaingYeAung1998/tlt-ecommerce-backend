import { GradeService } from './grade.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
export declare class GradeController {
    private readonly gradeService;
    constructor(gradeService: GradeService);
    create(createGradeDto: CreateGradeDto): void;
    findAll(query: {
        search: string;
        currentPage: number;
        perPage: number;
    }): Promise<import("./entities/grade.entity").Grade[] | import("../../core/utility/dto/pagination-list.dto").PaginationList>;
    findOne(id: string): Promise<import("./entities/grade.entity").Grade>;
    update(id: string, updateGradeDto: UpdateGradeDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").UpdateResult>;
}
