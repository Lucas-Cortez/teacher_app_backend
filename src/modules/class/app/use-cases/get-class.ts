import { inject, injectable } from "tsyringe";
import { IUseCase } from "src/core/abstracts/use-case";
import { ClassRepository, IClassRepository } from "../../domain/repositories/class.repository";
import { Class } from "../../domain/entities/class";

export type GetClassInput = { classId: string };
export type GetClassOutput = Class;

@injectable()
export class GetClassUseCase implements IUseCase<GetClassInput, GetClassOutput> {
  constructor(
    @inject(ClassRepository)
    private readonly classRepository: IClassRepository,
  ) {}

  async execute(input: GetClassInput): Promise<GetClassOutput> {
    const classEntity = await this.classRepository.findById(input.classId);

    if (!classEntity) {
      throw new Error("Class not found");
    }

    return classEntity;
  }
}
