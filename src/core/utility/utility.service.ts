import { Injectable } from '@nestjs/common';
import { PaginationList } from './dto/pagination-list.dto';

@Injectable()
export class UtilityService {
    createPaginationList(data: any[], currentPage: number, perPage: number, totalLength: number,) {
        let paginationList = new PaginationList();
        paginationList.data = data;
        paginationList.currentPage = currentPage;
        paginationList.perPage = perPage;
        paginationList.totalLength = totalLength;
        return paginationList;
    }
}
