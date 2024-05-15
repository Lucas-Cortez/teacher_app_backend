import { inject, injectable } from "tsyringe";
import { IUseCase } from "src/core/abstracts/use-case";
import { ClassRepository, IClassRepository } from "../../domain/repositories/class.repository";
import { Class } from "../../domain/entities/class";
import { PaginatedOutput } from "src/core/abstracts/pagination";
import { ClassQueryOptions } from "../../domain/entities/class-query-options";
import { PaginatedMetadataFactory } from "src/shared/factories/paginated-metadata-factory";

export type GetClassesTemplatesInput = {
  teacherId: string;
  query: Omit<ClassQueryOptions, "studentId" | "teacherId">;
};
export type GetClassesTemplatesOutput = PaginatedOutput<Class>;

@injectable()
export class GetClassesTemplatesUseCase
  implements IUseCase<GetClassesTemplatesInput, GetClassesTemplatesOutput>
{
  constructor(
    @inject(ClassRepository)
    private readonly classRepository: IClassRepository,
  ) {}

  async execute(input: GetClassesTemplatesInput): Promise<GetClassesTemplatesOutput> {
    const result = await this.classRepository.findAll({ teacherId: input.teacherId });

    return {
      data: result.data,
      meta: PaginatedMetadataFactory.create(input.query, result.count),
    };
  }
}
