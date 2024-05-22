import { inject, injectable } from "tsyringe";

import { IUseCase } from "src/core/abstracts/use-case";
import { HomeworkRepository, IHomeworkRepository } from "../../domain/repositories/homework.repository";
import { PaginatedOutput } from "src/core/abstracts/pagination";
import { Homework } from "../../domain/entities/homework";
import { HomeworkQueryOptions } from "../../domain/entities/homework-query-options";
import { PaginatedMetadataFactory } from "src/shared/factories/paginated-metadata-factory";

export type GetTeacherHomeworksInput = {
  teacherId: string;
  query?: Omit<HomeworkQueryOptions, "teacherId">;
};
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
    const result = await this.homeworkRepository.findAll({ ...input.query, teacherId: input.teacherId });

    return {
      data: result.data,
      meta: PaginatedMetadataFactory.create(input.query, result.count),
    };
  }
}
