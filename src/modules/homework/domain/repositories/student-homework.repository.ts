import { HomeworkQueryOptions } from "../entities/homework-query-options";
import { StudentHomework } from "../entities/student-homework";
import { StudentHomeworkQueryOptions } from "../entities/student-homework-query-options";

export const StudentHomeworkRepository = Symbol.for("HomeworkRepository");

export interface IStudentHomeworkRepository<Context = any> {
  create(homework: StudentHomework, ctx?: Context): Promise<void>;
  deleteByIdAndTeacherId(homeworkId: string, teacherId: string, ctx?: Context): Promise<void>;
  findById(
    studentHomeworkId: string,
    queryOptions?: StudentHomeworkQueryOptions,
    ctx?: Context,
  ): Promise<StudentHomework | null>;
  findAll(
    queryOptions: StudentHomeworkQueryOptions,
    ctx?: Context,
  ): Promise<{ data: StudentHomework[]; count: number }>;
  // findAll(
  //   queryOptions: HomeworkQueryOptions,
  //   ctx?: Context,
  // ): Promise<{ data: StudentHomework[]; count: number }>;
  // findById(homeworkId: string, ctx?: Context): Promise<StudentHomework | null>;
  // findByIdAndTeacherId(homeworkId: string, teacherId: string, ctx?: Context): Promise<StudentHomework | null>;
  // update(homework: StudentHomework, ctx?: Context): Promise<void>;
  // deleteByIdAndTeacherId(homeworkId: string, teacherId: string, ctx?: Context): Promise<void>;
}
