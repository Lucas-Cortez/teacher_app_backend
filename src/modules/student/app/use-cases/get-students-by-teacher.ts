import { inject, injectable } from "tsyringe";

import { IUseCase } from "src/core/abstracts/use-case";
import { IStudentRepository, StudentRepository } from "../../domain/repositories/student.repository";
import { StudentQueryOptions } from "../../domain/entities/student-query-options";
import { PaginatedOutput } from "src/core/abstracts/pagination";
import { Student } from "../../domain/entities/student";
import { buildPaginatedMetadata } from "src/shared/utils/helpers/build-paginated-metadata";

export type GetStudentsByTeacherInput = { teacherId: string; query?: Omit<StudentQueryOptions, "teacherId"> };
export type GetStudentsByTeacherOutput = PaginatedOutput<Student>;

@injectable()
export class GetStudentsByTeacherUseCase
  implements IUseCase<GetStudentsByTeacherInput, GetStudentsByTeacherOutput>
{
  constructor(
    @inject(StudentRepository)
    private readonly studentRepository: IStudentRepository,
  ) {}

  async execute(input: GetStudentsByTeacherInput): Promise<GetStudentsByTeacherOutput> {
    const { count, data } = await this.studentRepository.findAll({
      ...input.query,
      teacherId: input.teacherId,
    });

    return {
      data,
      meta: buildPaginatedMetadata(input.query, count),
    };
  }
}
