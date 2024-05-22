import { inject, injectable } from "tsyringe";

import { IUseCase } from "src/core/abstracts/use-case";
import { HomeworkRepository, IHomeworkRepository } from "../../domain/repositories/homework.repository";

export type DeleteHomeworkTemplateInput = {
  teacherId: string;
  homeworkId: string;
};
export type DeleteHomeworkTemplateOutput = void;

@injectable()
export class DeleteHomeworkTemplateUseCase
  implements IUseCase<DeleteHomeworkTemplateInput, DeleteHomeworkTemplateOutput>
{
  constructor(
    @inject(HomeworkRepository)
    private readonly homeworkRepository: IHomeworkRepository,
  ) {}

  async execute(input: DeleteHomeworkTemplateInput): Promise<DeleteHomeworkTemplateOutput> {
    await this.homeworkRepository.deleteByIdAndTeacherId(input.homeworkId, input.teacherId);
  }
}
