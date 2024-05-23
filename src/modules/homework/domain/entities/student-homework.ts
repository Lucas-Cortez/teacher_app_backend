import { randomUUID } from "crypto";
import { HomeworkStatus } from "../enums/homework-status";

export interface IStudentHomework {
  studentHomeworkId: string;
  title: string;
  content: string;
  deadline: Date;
  deliveredAt?: Date;
  refHomeworkId?: string;
  status: HomeworkStatus;

  // teacherStudentId: string;
  studentId: string;
  teacherId: string;
}

export class StudentHomework implements IStudentHomework {
  readonly studentHomeworkId: string;
  title: string;
  content: string;
  deadline: Date;
  deliveredAt?: Date | undefined;
  refHomeworkId?: string | undefined;
  status: HomeworkStatus;
  // readonly teacherStudentId: string;
  readonly studentId: string;
  readonly teacherId: string;

  private constructor(homework: IStudentHomework) {
    this.studentHomeworkId = homework.studentHomeworkId;
    this.title = homework.title;
    this.content = homework.content;
    this.deadline = homework.deadline;
    this.deliveredAt = homework.deliveredAt;
    this.refHomeworkId = homework.refHomeworkId;
    this.status = homework.status;

    // this.teacherStudentId = homework.teacherStudentId;
    this.studentId = homework.studentId;
    this.teacherId = homework.teacherId;
  }

  public static create(student: Omit<IStudentHomework, "studentHomeworkId">) {
    return new StudentHomework({ ...student, studentHomeworkId: randomUUID() });
  }

  public static restore(homework: IStudentHomework): StudentHomework {
    return new StudentHomework(homework);
  }
}
