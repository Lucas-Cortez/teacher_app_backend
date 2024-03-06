import { inject, injectable } from "tsyringe";

import { IUseCase } from "src/core/abstracts/use-case";
import { IStudentRepository, StudentRepository } from "../../domain/repositories/student.repository";
import { StudentQueryOptions } from "../../domain/entities/student-query-options";
import { PaginatedOutput } from "src/core/abstracts/pagination";
import { Student } from "../../domain/entities/student";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "src/core/constants/pagination-params";

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
    const data = await this.studentRepository.findAll({ ...input.query, teacherId: input.teacherId });

    return {
      data,
      meta: {
        page: input.query?.page || DEFAULT_PAGE,
        size: input.query?.size || DEFAULT_PAGE_SIZE,
        total: data.length,
      },
    };
  }
}
