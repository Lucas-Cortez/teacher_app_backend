import { TeacherStudent } from "../entities/teacher-student";

export const TeacherStudentRepository = Symbol.for("TeacherStudentRepository");

export interface ITeacherStudentRepository {
  findByStudentIdAndTeacherId(teacherId: string, studentId: string): Promise<TeacherStudent | null>;
}
