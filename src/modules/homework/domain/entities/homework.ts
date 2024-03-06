import { randomUUID } from "crypto";

export interface IHomework {
  homeworkId: string;
  teacherId: string;
  description: string;
}

export class Homework implements IHomework {
  homeworkId: string;
  teacherId: string;
  description: string;

  private constructor(homework: IHomework) {
    this.homeworkId = homework.homeworkId;
    this.teacherId = homework.teacherId;
    this.description = homework.description;
  }

  public static create(student: Omit<IHomework, "homeworkId">) {
    return new Homework({ ...student, homeworkId: randomUUID() });
  }

  public static restore(homework: IHomework): Homework {
    return new Homework(homework);
  }
}
