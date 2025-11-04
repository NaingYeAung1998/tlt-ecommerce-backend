import { PaginationList } from './dto/pagination-list.dto';
export declare class UtilityService {
    createPaginationList(data: any[], currentPage: number, perPage: number, totalLength: number): PaginationList;
}
