import { StudentClass } from "../entities/student-class";
import { StudentClassQueryOptions } from "../entities/student-class-query-options";

export const StudentClassRepository = Symbol.for("StudentClassRepository");

export interface IStudentClassRepository<Context = any> {
  findById(
    studentClassId: string,
    queryOptions?: Pick<StudentClassQueryOptions, "teacherId" | "studentId">,
    ctx?: Context,
  ): Promise<StudentClass | null>;
  findAll(
    queryOptions: StudentClassQueryOptions,
    ctx?: Context,
  ): Promise<{ count: number; data: StudentClass[] }>;
}
