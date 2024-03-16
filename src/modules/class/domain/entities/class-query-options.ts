import { PaginationOptions } from "src/core/abstracts/pagination";

export interface ClassQueryOptions extends PaginationOptions {
  teacherId?: string;

  startDate?: Date;
  endDate?: Date;
}
