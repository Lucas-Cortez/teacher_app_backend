import { inject, injectable } from "tsyringe";

import { IUseCase } from "src/core/abstracts/use-case";
import {
  IStudentHomeworkRepository,
  StudentHomeworkRepository,
} from "../../domain/repositories/student-homework.repository";

export type DeleteStudentHomeworkInput = {
  teacherId: string;
  studentHomeworkId: string;
};
export type DeleteStudentHomeworkOutput = void;

@injectable()
export class DeleteStudentHomeworkUseCase
  implements IUseCase<DeleteStudentHomeworkInput, DeleteStudentHomeworkOutput>
{
  constructor(
    @inject(StudentHomeworkRepository)
    private readonly studentHomeworkRepository: IStudentHomeworkRepository,
  ) {}

  async execute(input: DeleteStudentHomeworkInput): Promise<DeleteStudentHomeworkOutput> {
    await this.studentHomeworkRepository.deleteByIdAndTeacherId(input.studentHomeworkId, input.teacherId);
  }
}
