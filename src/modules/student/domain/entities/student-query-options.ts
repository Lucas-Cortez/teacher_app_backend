import { PaginationOptions } from "src/core/abstracts/pagination";

export interface StudentQueryOptions extends PaginationOptions {
  teacherId?: string;
}
