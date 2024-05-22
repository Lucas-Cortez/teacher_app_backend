import { inject, injectable } from "tsyringe";

import { IUseCase } from "src/core/abstracts/use-case";
import { StudentHomework } from "../../domain/entities/student-homework";
import {
  IStudentHomeworkRepository,
  StudentHomeworkRepository,
} from "../../domain/repositories/student-homework.repository";
import { HomeworkStatus } from "../../domain/enums/homework-status";
import { HomeworkRepository, IHomeworkRepository } from "../../domain/repositories/homework.repository";

export type UpdateStudentHomeworkInput = {
  teacherId: string;
  studentId: string;
  title?: string;
  content?: string;
  deadline?: Date;
  refHomeworkId?: string;
};
export type UpdateStudentHomeworkOutput = StudentHomework;

@injectable()
export class UpdateStudentHomeworkUseCase
  implements IUseCase<UpdateStudentHomeworkInput, UpdateStudentHomeworkOutput>
{
  constructor(
    @inject(StudentHomeworkRepository)
    private readonly studentHomeworkRepository: IStudentHomeworkRepository,
    // @inject(HomeworkRepository)
    // private readonly homeworkRepository: IHomeworkRepository,
  ) {}

  async execute(input: UpdateStudentHomeworkInput): Promise<UpdateStudentHomeworkOutput> {}
}
