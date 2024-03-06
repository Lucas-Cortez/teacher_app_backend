import { inject, injectable } from "tsyringe";

import { IUseCase } from "src/core/abstracts/use-case";
import { HomeworkRepository, IHomeworkRepository } from "../../domain/repositories/homework.repository";
import { PaginatedOutput } from "src/core/abstracts/pagination";
import { Homework } from "../../domain/entities/homework";
import { HomeworkQueryOptions } from "../../domain/entities/homework-query-options";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "src/core/constants/pagination-params";

export type GetTeacherHomeworksInput = { teacherId: string; query?: Omit<HomeworkQueryOptions, "teacherId"> };
export type GetTeacherHomeworksOutput = PaginatedOutput<Homework>;

@injectable()
export class GetTeacherHomeworksUseCase
  implements IUseCase<GetTeacherHomeworksInput, GetTeacherHomeworksOutput>
{
  constructor(
    @inject(HomeworkRepository)
    private readonly homeworkRepository: IHomeworkRepository,
  ) {}

  async execute(input: GetTeacherHomeworksInput): Promise<GetTeacherHomeworksOutput> {
    const data = await this.homeworkRepository.findAll({ ...input.query, teacherId: input.teacherId });

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
