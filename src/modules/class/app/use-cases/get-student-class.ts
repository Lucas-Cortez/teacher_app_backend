import { inject, injectable } from "tsyringe";
import { IUseCase } from "src/core/abstracts/use-case";
import {
  IStudentClassRepository,
  StudentClassRepository,
} from "../../domain/repositories/student-class.repository";
import { StudentClass } from "../../domain/entities/student-class";
// import {
//   ITeacherStudentRepository,
//   TeacherStudentRepository,
// } from "src/modules/student/domain/repositories/teacher-student.repository";

export type GetStudentClassInput = {
  teacherId?: string;
  studentId?: string;
  studentClassId: string;
};
export type GetStudentClassOutput = StudentClass;

@injectable()
export class GetStudentClassUseCase implements IUseCase<GetStudentClassInput, GetStudentClassOutput> {
  constructor(
    @inject(StudentClassRepository)
    private readonly studentClassRepository: IStudentClassRepository,
    // @inject(TeacherStudentRepository)
    // private readonly teacherStudentRepository: ITeacherStudentRepository,
  ) {}

  async execute(input: GetStudentClassInput): Promise<GetStudentClassOutput> {
    const studentClass = await this.studentClassRepository.findById(input.studentClassId, {
      teacherId: input.teacherId,
      studentId: input.studentId,
    });

    if (!studentClass) {
      throw new Error("Student class not found");
    }

    return studentClass;
  }
}
