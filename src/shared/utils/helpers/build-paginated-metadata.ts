import { PaginationOptions } from "src/core/abstracts/pagination";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "src/core/constants/pagination-params";

export function buildPaginatedMetadata<T extends PaginationOptions>(query?: T, count?: number) {
  return {
    page: query?.page || DEFAULT_PAGE,
    size: query?.size || DEFAULT_PAGE_SIZE,
    total: count || 0,
  };
}
