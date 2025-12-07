import { Injectable } from '@nestjs/common';
import { PaginationList } from './dto/pagination-list.dto';
import { CODE_ZERO_MIN_INITIALS } from '../constants';

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

    formatAutoIncrementCode(initials: string, itemLength: number) {
        let formattedCode = initials + "";
        let currentIndex = itemLength + 1;
        let zeros = CODE_ZERO_MIN_INITIALS - currentIndex.toString().length;
        for (let i = 0; i < zeros; i++) {
            formattedCode += "0";
        }
        formattedCode += currentIndex.toString();
        return formattedCode;
    }
}
