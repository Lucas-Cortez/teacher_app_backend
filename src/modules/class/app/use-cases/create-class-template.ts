import { inject, injectable } from "tsyringe";
import { IUseCase } from "src/core/abstracts/use-case";
import { ClassRepository, IClassRepository } from "../../domain/repositories/class.repository";
import { Class } from "../../domain/entities/class";
// import {
//   ITeacherStudentRepository,
//   TeacherStudentRepository,
// } from "src/modules/student/domain/repositories/teacher-student.repository";

export type CreateClassTemplateInput = {
  teacherId: string;
  title: string;
  content: string;
};

export type CreateClassTemplateOutput = Class;

@injectable()
export class CreateClassTemplateUseCase
  implements IUseCase<CreateClassTemplateInput, CreateClassTemplateOutput>
{
  constructor(
    @inject(ClassRepository)
    private readonly classRepository: IClassRepository,
    // @inject(TeacherStudentRepository)
    // private readonly teacherStudentRepository: ITeacherStudentRepository,
  ) {}

  async execute(input: CreateClassTemplateInput): Promise<CreateClassTemplateOutput> {
    // const teacherStudent = await this.teacherStudentRepository.findByStudentIdAndTeacherId(
    //   input.teacherId,
    //   input.studentId,
    // );

    // if (!teacherStudent) {
    //   throw new Error("Teacher and student are not vinculated");
    // }

    const classEntity = Class.create({
      teacherId: input.teacherId,
      title: input.title,
      content: input.content,
      type: "test",
    });

    await this.classRepository.create(classEntity);

    return classEntity;
  }
}
