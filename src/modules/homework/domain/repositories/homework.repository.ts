import { Homework } from "../entities/homework";
import { HomeworkQueryOptions } from "../entities/homework-query-options";

export const HomeworkRepository = Symbol.for("HomeworkRepository");

export interface IHomeworkRepository {
  findAll(queryOptions: HomeworkQueryOptions): Promise<{ data: Homework[]; count: number }>;
  findById(homeworkId: string): Promise<Homework | null>;
  create(homework: Homework): Promise<void>;
  update(homework: Homework): Promise<void>;
}
