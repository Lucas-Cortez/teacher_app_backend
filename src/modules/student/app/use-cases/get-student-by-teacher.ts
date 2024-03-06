import { inject, injectable } from "tsyringe";

import { IUseCase } from "src/core/abstracts/use-case";
import { IStudentRepository, StudentRepository } from "../../domain/repositories/student.repository";
import { Student } from "../../domain/entities/student";

export type GetStudentByTeacherInput = { studentId: string; teacherId: string };
export type GetStudentByTeacherOutput = Student;

@injectable()
export class GetStudentByTeacherUseCase
  implements IUseCase<GetStudentByTeacherInput, GetStudentByTeacherOutput>
{
  constructor(
    @inject(StudentRepository)
    private readonly studentRepository: IStudentRepository,
  ) {}

  async execute(input: GetStudentByTeacherInput): Promise<GetStudentByTeacherOutput> {
    const student = await this.studentRepository.findByIdAndTeacherId(input.studentId, input.teacherId);

    if (!student) throw new Error("Student not found");

    return student;
  }
}
