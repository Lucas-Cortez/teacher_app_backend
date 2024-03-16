import { inject, injectable } from "tsyringe";
import { IUseCase } from "src/core/abstracts/use-case";
import { ClassRepository, IClassRepository } from "../../domain/repositories/class.repository";
import { Class } from "../../domain/entities/class";
import {
  ITeacherStudentRepository,
  TeacherStudentRepository,
} from "src/modules/student/domain/repositories/teacher-student.repository";

export type CreateClassInput = {
  teacherId: string;
  studentId: string;
  content?: string;
  startAt: Date;
  duration: string;
};

export type CreateClassOutput = Class;

@injectable()
export class CreateClassUseCase implements IUseCase<CreateClassInput, CreateClassOutput> {
  constructor(
    @inject(ClassRepository)
    private readonly classRepository: IClassRepository,
    @inject(TeacherStudentRepository)
    private readonly teacherStudentRepository: ITeacherStudentRepository,
  ) {}

  async execute(input: CreateClassInput): Promise<CreateClassOutput> {
    const teacherStudent = await this.teacherStudentRepository.findByStudentIdAndTeacherId(
      input.teacherId,
      input.studentId,
    );

    if (!teacherStudent) {
      throw new Error("Teacher and student are not vinculated");
    }

    const classEntity = Class.create({
      content: input.content,
      startAt: input.startAt,
      duration: input.duration,
      teacherStudentId: teacherStudent.teacherStudentId,
    });

    await this.classRepository.create(classEntity);

    return classEntity;
  }
}
