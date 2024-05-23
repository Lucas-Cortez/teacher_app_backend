import { inject, injectable } from "tsyringe";

import { IUseCase } from "src/core/abstracts/use-case";
import {
  IStudentHomeworkRepository,
  StudentHomeworkRepository,
} from "../../domain/repositories/student-homework.repository";
import { StudentHomework } from "../../domain/entities/student-homework";
import { PaginatedOutput } from "src/core/abstracts/pagination";
import { PaginatedMetadataFactory } from "src/shared/factories/paginated-metadata-factory";
import { StudentHomeworkQueryOptions } from "../../domain/entities/student-homework-query-options";

export type GetStudentHomeworksInput = {
  studentId: string;
  teacherId: string;
  // order: "asc" | "desc";
  startDate?: Date;
  endDate?: Date;
  query: Omit<StudentHomeworkQueryOptions, "studentId" | "teacherId">;
};
export type GetStudentHomeworksOutput = PaginatedOutput<StudentHomework>;

@injectable()
export class GetStudentHomeworksUseCase
  implements IUseCase<GetStudentHomeworksInput, GetStudentHomeworksOutput>
{
  constructor(
    @inject(StudentHomeworkRepository)
    private readonly studentHomeworkRepository: IStudentHomeworkRepository,
  ) {}

  async execute(input: GetStudentHomeworksInput): Promise<GetStudentHomeworksOutput> {
    if (!input.startDate && !input.endDate) throw new Error("startDate or endDate is required");

    if (input.startDate && input.endDate) throw new Error("startDate and endDate cannot be used together");

    const result = await this.studentHomeworkRepository.findAll({
      studentId: input.studentId,
      teacherId: input.teacherId,
      startDate: input.startDate,
      endDate: input.endDate,
      ...input.query,
    });

    return {
      data: result.data,
      meta: PaginatedMetadataFactory.create(input.query, result.count),
    };
  }
}
