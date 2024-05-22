import { inject, injectable } from "tsyringe";

import { IUseCase } from "src/core/abstracts/use-case";
import { HomeworkRepository, IHomeworkRepository } from "../../domain/repositories/homework.repository";
import { Homework } from "../../domain/entities/homework";

export type UpdateHomeworkTemplateInput = {
  homeworkId: string;
  teacherId: string;
  title?: string;
  content?: string;
};
export type UpdateHomeworkTemplateOutput = Homework;

@injectable()
export class UpdateHomeworkTemplateUseCase
  implements IUseCase<UpdateHomeworkTemplateInput, UpdateHomeworkTemplateOutput>
{
  constructor(
    @inject(HomeworkRepository)
    private readonly homeworkRepository: IHomeworkRepository,
  ) {}

  async execute(input: UpdateHomeworkTemplateInput): Promise<UpdateHomeworkTemplateOutput> {
    const homeworkTemplate = await this.homeworkRepository.findByIdAndTeacherId(
      input.homeworkId,
      input.teacherId,
    );

    if (!homeworkTemplate) throw new Error("Homework template not found");

    homeworkTemplate.updateValues({
      title: input.title,
      content: input.content,
    });

    await this.homeworkRepository.update(homeworkTemplate);

    return homeworkTemplate;
  }
}
