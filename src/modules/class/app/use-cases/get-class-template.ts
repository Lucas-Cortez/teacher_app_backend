import { inject, injectable } from "tsyringe";
import { IUseCase } from "src/core/abstracts/use-case";
import { ClassRepository, IClassRepository } from "../../domain/repositories/class.repository";
import { Class } from "../../domain/entities/class";

export type GetClassTemplateInput = { classId: string; teacherId: string };
export type GetClassTemplateOutput = Class;

@injectable()
export class GetClassTemplateUseCase implements IUseCase<GetClassTemplateInput, GetClassTemplateOutput> {
  constructor(
    @inject(ClassRepository)
    private readonly classRepository: IClassRepository,
  ) {}

  async execute(input: GetClassTemplateInput): Promise<GetClassTemplateOutput> {
    const classEntity = await this.classRepository.findByIdAndTeacherId(input.classId, input.teacherId);

    if (!classEntity) {
      throw new Error("Class not found");
    }

    return classEntity;
  }
}
