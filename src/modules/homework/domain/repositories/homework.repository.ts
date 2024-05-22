import { Homework } from "../entities/homework";
import { HomeworkQueryOptions } from "../entities/homework-query-options";

export const HomeworkRepository = Symbol.for("HomeworkRepository");

export interface IHomeworkRepository<Context = any> {
  findAll(queryOptions: HomeworkQueryOptions, ctx?: Context): Promise<{ data: Homework[]; count: number }>;
  findById(homeworkId: string, ctx?: Context): Promise<Homework | null>;
  findByIdAndTeacherId(homeworkId: string, teacherId: string, ctx?: Context): Promise<Homework | null>;
  create(homework: Homework, ctx?: Context): Promise<void>;
  update(homework: Homework, ctx?: Context): Promise<void>;
  deleteByIdAndTeacherId(homeworkId: string, teacherId: string, ctx?: Context): Promise<void>;
}
