import { inject, injectable } from "tsyringe";

import { IUseCase } from "src/core/abstracts/use-case";
import {
  IStudentHomeworkRepository,
  StudentHomeworkRepository,
} from "../../domain/repositories/student-homework.repository";
import { StudentHomework } from "../../domain/entities/student-homework";

export type GetStudentHomeworkInput = {
  studentId: string;
  studentHomeworkId: string;
  teacherId: string;
};
export type GetStudentHomeworkOutput = StudentHomework;

@injectable()
export class GetStudentHomeworkUseCase
  implements IUseCase<GetStudentHomeworkInput, GetStudentHomeworkOutput>
{
  constructor(
    @inject(StudentHomeworkRepository)
    private readonly studentHomeworkRepository: IStudentHomeworkRepository,
  ) {}

  async execute(input: GetStudentHomeworkInput): Promise<GetStudentHomeworkOutput> {
    const studentHomework = await this.studentHomeworkRepository.findById(input.studentHomeworkId, {
      studentId: input.studentId,
      teacherId: input.teacherId,
    });

    if (!studentHomework) throw new Error("Student homework not found");

    return studentHomework;
  }
}
