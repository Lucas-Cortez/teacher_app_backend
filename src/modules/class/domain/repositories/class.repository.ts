import { Class } from "../entities/class";

export const ClassRepository = Symbol.for("ClassRepository");

export interface IClassRepository {
  findById(classId: string): Promise<Class | null>;
}
