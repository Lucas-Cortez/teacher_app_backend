import { randomUUID } from "crypto";

export interface IHomework {
  homeworkId: string;
  teacherId: string;
  title: string;
  content: string;
}

export class Homework implements IHomework {
  readonly homeworkId: string;
  readonly teacherId: string;
  title: string;
  content: string;

  private constructor(homework: IHomework) {
    this.homeworkId = homework.homeworkId;
    this.title = homework.title;
    this.teacherId = homework.teacherId;
    this.content = homework.content;
  }

  public static create(student: Omit<IHomework, "homeworkId">) {
    return new Homework({ ...student, homeworkId: randomUUID() });
  }

  public static restore(homework: IHomework): Homework {
    return new Homework(homework);
  }

  updateValues(data: Partial<IHomework>) {
    ["title", "content"].forEach((field) => {
      if (data[field]) this[field] = data[field];
    });
  }
}
