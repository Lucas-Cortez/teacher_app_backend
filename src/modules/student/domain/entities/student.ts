import { randomUUID } from "crypto";
import { User } from "src/modules/user/domain/entities/user";

export interface IStudent {
  studentId: string;
  userId: string;

  user?: User;
}

export class Student implements IStudent {
  studentId: string;
  userId: string;

  user?: User;

  private constructor(student: IStudent) {
    this.studentId = student.studentId;
    this.userId = student.userId;
    this.user = student.user;
  }

  static restore(student: IStudent) {
    return new Student(student);
  }

  static create(student: Omit<IStudent, "studentId">) {
    return new Student({ ...student, studentId: randomUUID() });
  }
}
