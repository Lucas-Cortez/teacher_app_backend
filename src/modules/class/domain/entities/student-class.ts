import { randomUUID } from "crypto";
import { Duration } from "../enums/duration";

export interface IStudentClass {
  studentClassId: string;
  content?: string;
  title?: string;
  type?: string;
  startAt: Date;
  duration: Duration;

  refClassId?: string;
  teacherStudentId: string;
}

export class StudentClass implements IStudentClass {
  readonly studentClassId: string;
  content?: string;
  title?: string;
  type?: string;
  startAt: Date;
  duration: Duration;

  refClassId?: string;
  readonly teacherStudentId: string;

  private constructor(studentClass: IStudentClass) {
    this.studentClassId = studentClass.studentClassId;
    this.content = studentClass.content;
    this.title = studentClass.title;
    this.type = studentClass.type;
    this.startAt = studentClass.startAt;
    this.duration = studentClass.duration;
    this.refClassId = studentClass.refClassId;
    this.teacherStudentId = studentClass.teacherStudentId;
  }

  public static create(studentClass: Omit<IStudentClass, "studentClassId">) {
    return new StudentClass({ ...studentClass, studentClassId: randomUUID() });
  }

  public static restore(studentClass: IStudentClass) {
    return new StudentClass(studentClass);
  }
}
