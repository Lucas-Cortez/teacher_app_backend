import { inject, injectable } from "tsyringe";

import { IUseCase } from "src/core/abstracts/use-case";
import { HomeworkRepository, IHomeworkRepository } from "../../domain/repositories/homework.repository";
import { Homework } from "../../domain/entities/homework";
import { PaginatedOutput } from "src/core/abstracts/pagination";
import { HomeworkQueryOptions } from "../../domain/entities/homework-query-options";
import { PaginatedMetadataFactory } from "src/shared/factories/paginated-metadata-factory";

export type GetHomeworkTemplatesInput = {
  homeworkId: string;
  query: Omit<HomeworkQueryOptions, "teacherId">;
};
export type GetHomeworkTemplatesOutput = PaginatedOutput<Homework>;

@injectable()
export class GetHomeworkTemplatesUseCase
  implements IUseCase<GetHomeworkTemplatesInput, GetHomeworkTemplatesOutput>
{
  constructor(
    @inject(HomeworkRepository)
    private readonly homeworkRepository: IHomeworkRepository,
  ) {}

  async execute(input: GetHomeworkTemplatesInput): Promise<GetHomeworkTemplatesOutput> {
    const result = await this.homeworkRepository.findAll({ ...input.query });

    return {
      data: result.data,
      meta: PaginatedMetadataFactory.create(input.query, result.count),
    };
  }
}
