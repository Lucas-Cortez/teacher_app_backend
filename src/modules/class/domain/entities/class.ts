import { randomUUID } from "crypto";

export interface IClass {
  classId: string;
  title: string;
  content: string;
  type: string;

  teacherId: string;
}

export class Class implements IClass {
  readonly classId: string;
  title: string;
  content: string;
  type: string;
  readonly teacherId: string;

  private constructor(data: IClass) {
    this.classId = data.classId;
    this.title = data.title;
    this.content = data.content;
    this.type = data.type;
    this.teacherId = data.teacherId;
  }

  public static create(data: Omit<IClass, "classId">) {
    return new Class({ ...data, classId: randomUUID() });
  }

  public static restore(data: IClass): Class {
    return new Class(data);
  }

  public updateValues(data: Partial<Omit<IClass, "classId" | "teacherId">>) {
    ["title", "content", "type"].forEach((field) => {
      if (data[field]) this[field] = data[field];
    });
  }
}
