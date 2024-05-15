import { inject, injectable } from "tsyringe";
import { IUseCase } from "src/core/abstracts/use-case";
import { PaginatedOutput } from "src/core/abstracts/pagination";
import { PaginatedMetadataFactory } from "src/shared/factories/paginated-metadata-factory";
import {
  IStudentClassRepository,
  StudentClassRepository,
} from "../../domain/repositories/student-class.repository";
import { StudentClass } from "../../domain/entities/student-class";
import { StudentClassQueryOptions } from "../../domain/entities/student-class-query-options";

export type GetTeacherClassesInput = {
  teacherId: string;
  query: Omit<StudentClassQueryOptions, "studentId" | "teacherId">;
};
export type GetTeacherClassesOutput = PaginatedOutput<StudentClass>;

@injectable()
export class GetTeacherClassesUseCase implements IUseCase<GetTeacherClassesInput, GetTeacherClassesOutput> {
  constructor(
    @inject(StudentClassRepository)
    private readonly studentClassRepository: IStudentClassRepository,
  ) {}

  async execute(input: GetTeacherClassesInput): Promise<GetTeacherClassesOutput> {
    const { data, count } = await this.studentClassRepository.findAll({
      ...input.query,
      teacherId: input.teacherId,
    });

    return {
      data,
      meta: PaginatedMetadataFactory.create(input.query, count),
    };
  }
}

/**
 * teacherId
 * studentId
 * startDate
 * endDate
 * size
 * page
 *
 *
 *
 *
 */
