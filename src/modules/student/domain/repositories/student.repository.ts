import { Student } from "../entities/student";
import { StudentQueryOptions } from "../entities/student-query-options";
import { TeacherStudent } from "../entities/teacher-student";

export const StudentRepository = Symbol.for("StudentRepository");

export interface IStudentRepository<Context = any> {
  findByIdAndTeacherId(studentId: string, teacherId: string, ctx?: Context): Promise<Student | null>;
  findAll(queryOptions?: StudentQueryOptions, ctx?: Context): Promise<{ count: number; data: Student[] }>;
  findById(studentId: string, ctx?: Context): Promise<Student | null>;
  findByUserId(userId: string, ctx?: Context): Promise<Student | null>;
  create(student: Student, ctx?: Context): Promise<Student>;
  vinculateTeacher(teacherStudent: TeacherStudent, ctx?: Context): Promise<void>;
}
