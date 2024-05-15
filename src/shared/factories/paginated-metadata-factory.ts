import { PaginationOptions } from "src/core/abstracts/pagination";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "src/core/constants/pagination-params";

// export function paginatedMetadataFactory<T extends PaginationOptions>(query?: T, count?: number) {
//   return {
//     page: query?.page || DEFAULT_PAGE,
//     size: query?.size || DEFAULT_PAGE_SIZE,
//     total: count || 0,
//   };
// }

export class PaginatedMetadataFactory {
  static create<T extends PaginationOptions>(query?: T, count?: number) {
    const hasPagination = query?.page || query?.size;

    return {
      ...(hasPagination && {
        page: query?.page || DEFAULT_PAGE,
        size: query?.size || DEFAULT_PAGE_SIZE,
      }),
      total: count || 0,
      ...(query?.startDate && { startDate: query.startDate }),
      ...(query?.endDate && { endDate: query.endDate }),
    };
  }
}
