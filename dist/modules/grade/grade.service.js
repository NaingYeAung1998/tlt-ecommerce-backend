"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const grade_entity_1 = require("./entities/grade.entity");
const utility_service_1 = require("../../core/utility/utility.service");
const typeorm_2 = require("@nestjs/typeorm");
let GradeService = class GradeService {
    constructor(gradeRepository, utilityService) {
        this.gradeRepository = gradeRepository;
        this.utilityService = utilityService;
    }
    create(createGradeDto) {
        this.gradeRepository.save(createGradeDto);
    }
    async findAll(search, currentPage, perPage) {
        if (perPage < 0) {
            return await this.gradeRepository.find({ where: { isDelete: false }, order: { grade_name: 'ASC' } });
        }
        else {
            let [data, toatlLength] = await this.gradeRepository.createQueryBuilder("grade")
                .where("grade.isDelete = :isDelete AND ( grade.grade_name Like(:search) OR grade.grade_description Like(:search))", { isDelete: false, search: `%${search}%` })
                .orderBy("grade.created_on", "DESC")
                .skip(currentPage * perPage)
                .take(perPage)
                .getManyAndCount();
            return this.utilityService.createPaginationList(data, currentPage, perPage, toatlLength);
        }
    }
    findOne(id) {
        return this.gradeRepository.findOne({ where: { grade_id: id } });
    }
    update(id, updateGradeDto) {
        return this.gradeRepository.update({ grade_id: id }, updateGradeDto);
    }
    async remove(id) {
        let grade = await this.findOne(id);
        if (!grade) {
            throw new common_1.HttpException("Grade not found", common_1.HttpStatus.NOT_FOUND);
        }
        grade.isDelete = true;
        return this.gradeRepository.update({ grade_id: id }, grade);
    }
};
exports.GradeService = GradeService;
exports.GradeService = GradeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(grade_entity_1.Grade)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        utility_service_1.UtilityService])
], GradeService);
//# sourceMappingURL=grade.service.js.map