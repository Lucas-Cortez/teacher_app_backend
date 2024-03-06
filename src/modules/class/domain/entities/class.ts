import { randomUUID } from "crypto";

export interface IClass {
  classId: string;
  content?: string;
  startAt: Date;
  duration: string;

  teacherStudentId: string;
}

export class Class implements IClass {
  classId: string;
  content?: string;
  startAt: Date;
  duration: string;
  teacherStudentId: string;

  private constructor(data: IClass) {
    this.classId = data.classId;
    this.content = data.content;
    this.startAt = data.startAt;
    this.duration = data.duration;
    this.teacherStudentId = data.teacherStudentId;
  }

  public static create(data: Omit<IClass, "classId">) {
    return new Class({ ...data, classId: randomUUID() });
  }

  public static restore(data: IClass): Class {
    return new Class(data);
  }
}
