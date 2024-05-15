import { PaginationOptions } from "src/core/abstracts/pagination";

export interface ClassQueryOptions extends PaginationOptions {
  teacherId?: string;
  studentId?: string;
}
