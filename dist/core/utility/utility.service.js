"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilityService = void 0;
const common_1 = require("@nestjs/common");
const pagination_list_dto_1 = require("./dto/pagination-list.dto");
const constants_1 = require("../constants");
let UtilityService = class UtilityService {
    createPaginationList(data, currentPage, perPage, totalLength) {
        let paginationList = new pagination_list_dto_1.PaginationList();
        paginationList.data = data;
        paginationList.currentPage = currentPage;
        paginationList.perPage = perPage;
        paginationList.totalLength = totalLength;
        return paginationList;
    }
    formatAutoIncrementCode(initials, itemLength) {
        let formattedCode = initials + "";
        let currentIndex = itemLength + 1;
        let zeros = constants_1.CODE_ZERO_MIN_INITIALS - currentIndex.toString().length;
        for (let i = 0; i < zeros; i++) {
            formattedCode += "0";
        }
        formattedCode += currentIndex.toString();
        return formattedCode;
    }
};
exports.UtilityService = UtilityService;
exports.UtilityService = UtilityService = __decorate([
    (0, common_1.Injectable)()
], UtilityService);
//# sourceMappingURL=utility.service.js.map