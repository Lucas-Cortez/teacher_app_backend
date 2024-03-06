import { PaginationOptions } from "src/core/abstracts/pagination";

export interface HomeworkQueryOptions extends PaginationOptions {
  teacherId?: string;
}
