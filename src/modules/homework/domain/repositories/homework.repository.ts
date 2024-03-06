import { Homework } from "../entities/homework";
import { HomeworkQueryOptions } from "../entities/homework-query-options";

export const HomeworkRepository = Symbol.for("HomeworkRepository");

export interface IHomeworkRepository {
  findAll(queryOptions: HomeworkQueryOptions): Promise<Homework[]>;
  findById(homeworkId: string): Promise<Homework | null>;
}
