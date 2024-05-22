import { inject, injectable } from "tsyringe";

import { IUseCase } from "src/core/abstracts/use-case";
import { StudentHomework } from "../../domain/entities/student-homework";
import {
  IStudentHomeworkRepository,
  StudentHomeworkRepository,
} from "../../domain/repositories/student-homework.repository";
import { HomeworkStatus } from "../../domain/enums/homework-status";
import { HomeworkRepository, IHomeworkRepository } from "../../domain/repositories/homework.repository";

export type CreateStudentHomeworkInput = {
  teacherId: string;
  studentId: string;
  title?: string;
  content?: string;
  deadline: Date;
  refHomeworkId?: string;
};
export type CreateStudentHomeworkOutput = StudentHomework;

@injectable()
export class CreateStudentHomeworkUseCase
  implements IUseCase<CreateStudentHomeworkInput, CreateStudentHomeworkOutput>
{
  constructor(
    @inject(StudentHomeworkRepository)
    private readonly studentHomeworkRepository: IStudentHomeworkRepository,
    @inject(HomeworkRepository)
    private readonly homeworkRepository: IHomeworkRepository,
  ) {}

  async execute(input: CreateStudentHomeworkInput): Promise<CreateStudentHomeworkOutput> {
    let auxTitle: string = "";
    let auxContent: string = "";

    if (input.refHomeworkId) {
      const homeworkTemplate = await this.homeworkRepository.findByIdAndTeacherId(
        input.refHomeworkId,
        input.teacherId,
      );

      if (!homeworkTemplate) throw new Error("Homework template not found");

      auxTitle = homeworkTemplate.title;
      auxContent = homeworkTemplate.content;
    }

    if (input.title) auxTitle = input.title;
    if (input.content) auxContent = input.content;

    if (!auxTitle || !auxContent) throw new Error("Title and content are required");

    const studentHomework = StudentHomework.create({
      teacherId: input.teacherId,
      studentId: input.studentId,
      title: auxTitle,
      content: auxContent,
      deadline: input.deadline,
      status: HomeworkStatus.PENDING,
      refHomeworkId: input.refHomeworkId,
    });

    await this.studentHomeworkRepository.create(studentHomework);

    return studentHomework;
  }
}
