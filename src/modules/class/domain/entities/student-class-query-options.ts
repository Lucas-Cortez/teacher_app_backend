import { PaginationOptions } from "src/core/abstracts/pagination";

export interface StudentClassQueryOptions extends PaginationOptions {
  teacherId?: string;
  studentId?: string;
  // content?: string;
  // title?: string;
  // type?: string;
  // startAt?: Date;
  // duration?: Duration;
  // refClassId?: string;
}
