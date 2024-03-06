import { randomUUID } from "crypto";

export interface ITeacherStudent {
  teacherStudentId: string;
  studentId: string;
  teacherId: string;
  active: boolean;
}

export class TeacherStudent implements ITeacherStudent {
  teacherStudentId: string;
  studentId: string;
  teacherId: string;
  active: boolean;

  private constructor(teacherStudent: ITeacherStudent) {
    this.teacherStudentId = teacherStudent.teacherStudentId;
    this.studentId = teacherStudent.studentId;
    this.teacherId = teacherStudent.teacherId;
    this.active = teacherStudent.active;
  }

  static restore(teacherStudent: ITeacherStudent) {
    return new TeacherStudent(teacherStudent);
  }

  static create(teacherStudent: Omit<ITeacherStudent, "teacherStudentId">) {
    return new TeacherStudent({ ...teacherStudent, teacherStudentId: randomUUID() });
  }
}
