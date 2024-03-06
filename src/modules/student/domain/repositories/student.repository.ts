import { Student } from "../entities/student";
import { StudentQueryOptions } from "../entities/student-query-options";
import { TeacherStudent } from "../entities/teacher-student";

export const StudentRepository = Symbol.for("StudentRepository");

export interface IStudentRepository {
  findByIdAndTeacherId(studentId: string, teacherId: string): Promise<Student | null>;
  findAll(queryOptions?: StudentQueryOptions): Promise<Student[]>;
  findById(studentId: string): Promise<Student | null>;
  // findByEmail(email: string): Promise<Student | null>;
  // findByUserEmail(email: string): Promise<Student | null>;
  findByUserId(userId: string): Promise<Student | null>;
  create(student: Student): Promise<Student>;
  vinculateTeacher(teacherStudent: TeacherStudent): Promise<void>;
}
