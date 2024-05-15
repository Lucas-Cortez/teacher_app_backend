import { Class } from "../entities/class";
import { ClassQueryOptions } from "../entities/class-query-options";

export const ClassRepository = Symbol.for("ClassRepository");

export interface IClassRepository<Context = any> {
  findByIdAndTeacherId(classId: string, teacherId: string, ctx?: Context): Promise<Class | null>;
  findAll(queryOptions?: ClassQueryOptions, ctx?: Context): Promise<{ count: number; data: Class[] }>;
  create(classEntity: Class, ctx?: Context): Promise<void>;
  update(classEntity: Class, ctx?: Context): Promise<void>;
}
