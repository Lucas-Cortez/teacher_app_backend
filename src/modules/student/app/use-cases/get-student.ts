import { inject, injectable } from "tsyringe";

import { IUseCase } from "src/core/abstracts/use-case";
import { IStudentRepository, StudentRepository } from "../../domain/repositories/student.repository";
import { Student } from "../../domain/entities/student";

export type GetStudentInput = { studentId: string };
export type GetStudentOutput = Student;

@injectable()
export class GetStudentUseCase implements IUseCase<GetStudentInput, GetStudentOutput> {
  constructor(
    @inject(StudentRepository)
    private readonly studentRepository: IStudentRepository,
  ) {}

  async execute(input: GetStudentInput): Promise<GetStudentOutput> {
    const student = await this.studentRepository.findById(input.studentId);

    if (!student) throw new Error("Student not found");

    return student;
  }
}
