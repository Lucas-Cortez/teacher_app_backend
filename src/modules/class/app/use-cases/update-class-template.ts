import { inject, injectable } from "tsyringe";
import { IUseCase } from "src/core/abstracts/use-case";
import { ClassRepository, IClassRepository } from "../../domain/repositories/class.repository";
import { Class } from "../../domain/entities/class";

export type UpdateClassTemplateInput = {
  teacherId: string;
  classId: string;
  title?: string;
  content?: string;
};

export type UpdateClassTemplateOutput = Class;

@injectable()
export class UpdateClassTemplateUseCase
  implements IUseCase<UpdateClassTemplateInput, UpdateClassTemplateOutput>
{
  constructor(
    @inject(ClassRepository)
    private readonly classRepository: IClassRepository,
  ) {}

  async execute(input: UpdateClassTemplateInput): Promise<UpdateClassTemplateOutput> {
    const classEntity = await this.classRepository.findByIdAndTeacherId(input.classId, input.teacherId);

    if (!classEntity) {
      throw new Error("Class not found");
    }

    classEntity.updateValues({
      title: input.title,
      content: input.content,
      // type: "test",
    });

    await this.classRepository.update(classEntity);

    return classEntity;
  }
}
