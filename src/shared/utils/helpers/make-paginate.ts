import { PaginationOptions } from "src/core/abstracts/pagination";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "src/core/constants/pagination-params";

export function makePaginate({ page = DEFAULT_PAGE, size = DEFAULT_PAGE_SIZE }: PaginationOptions = {}) {
  return {
    limit: size,
    offset: page > 1 ? (page - 1) * size : 0,
  };
}
