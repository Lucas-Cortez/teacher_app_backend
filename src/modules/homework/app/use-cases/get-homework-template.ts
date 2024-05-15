import { inject, injectable } from "tsyringe";

import { IUseCase } from "src/core/abstracts/use-case";
import { HomeworkRepository, IHomeworkRepository } from "../../domain/repositories/homework.repository";
import { Homework } from "../../domain/entities/homework";

export type GetHomeworkTemplateInput = { homeworkId: string };
export type GetHomeworkTemplateOutput = Homework;

@injectable()
export class GetHomeworkTemplateUseCase
  implements IUseCase<GetHomeworkTemplateInput, GetHomeworkTemplateOutput>
{
  constructor(
    @inject(HomeworkRepository)
    private readonly homeworkRepository: IHomeworkRepository,
  ) {}

  async execute(input: GetHomeworkTemplateInput): Promise<GetHomeworkTemplateOutput> {
    const homeworkTemplate = await this.homeworkRepository.findById(input.homeworkId);

    if (!homeworkTemplate) throw new Error("Homework template not found");

    return homeworkTemplate;
  }
}
