import { PaginationOptions } from "src/core/abstracts/pagination";

export interface StudentHomeworkQueryOptions extends PaginationOptions {
  studentId?: string;
  teacherId?: string;
}
