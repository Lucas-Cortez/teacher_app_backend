import { inject, injectable } from "tsyringe";
import { IUseCase } from "src/core/abstracts/use-case";
import { Class } from "../../domain/entities/class";
import { PaginatedOutput } from "src/core/abstracts/pagination";
import { PaginatedMetadataFactory } from "src/shared/factories/paginated-metadata-factory";
import { ClassQueryOptions } from "../../domain/entities/class-query-options";
import {
  IStudentClassRepository,
  StudentClassRepository,
} from "../../domain/repositories/student-class.repository";

export type GetStudentClassesInput = {
  // teacherId: string;
  studentId: string;
  query: Omit<ClassQueryOptions, "studentId" | "teacherId">;
};
export type GetStudentClassesOutput = PaginatedOutput<Class>;

@injectable()
export class GetStudentClassesUseCase implements IUseCase<GetStudentClassesInput, GetStudentClassesOutput> {
  constructor(
    @inject(StudentClassRepository)
    private readonly studentClassRepository: IStudentClassRepository,
  ) {}

  async execute(input: GetStudentClassesInput): Promise<GetStudentClassesOutput> {
    const { data, count } = await this.studentClassRepository.findAll({
      ...input.query,
      studentId: input.studentId,
      // teacherId: input.teacherId,
    });

    return {
      data,
      meta: PaginatedMetadataFactory.create(input.query, count),
    };
  }
}
