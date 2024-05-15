import { inject, injectable } from "tsyringe";

import { IUseCase } from "src/core/abstracts/use-case";
import { HomeworkRepository, IHomeworkRepository } from "../../domain/repositories/homework.repository";
import { Homework } from "../../domain/entities/homework";

export type CreateHomeworkTemplateInput = {
  teacherId: string;
  title: string;
  content: string;
};
export type CreateHomeworkTemplateOutput = Homework;

@injectable()
export class CreateHomeworkTemplateUseCase
  implements IUseCase<CreateHomeworkTemplateInput, CreateHomeworkTemplateOutput>
{
  constructor(
    @inject(HomeworkRepository)
    private readonly homeworkRepository: IHomeworkRepository,
  ) {}

  async execute(input: CreateHomeworkTemplateInput): Promise<CreateHomeworkTemplateOutput> {
    const homeworkTemplate = Homework.create({
      teacherId: input.teacherId,
      title: input.title,
      content: input.content,
    });

    await this.homeworkRepository.create(homeworkTemplate);

    return homeworkTemplate;
  }
}
